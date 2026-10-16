import { useEffect, useRef } from "react";
import { LayerGroup, LayersControl, MapContainer, ScaleControl, TileLayer, useMap } from "react-leaflet";
import DeviceMarker from "./DeviceMarker";

// Titik awal sebelum data device tiba (area Telkom University)
const DEFAULT_CENTER = [-6.9725, 107.6303];
const FOCUS_ZOOM = 16;

const hasCoords = d => Number.isFinite(d?.lat) && Number.isFinite(d?.lng);

/** Arahkan peta ke device terpilih (tanpa animasi saat pertama kali) */
function FlyToSelected({ device }) {
    const map = useMap();
    const first = useRef(true);

    useEffect(() => {
        if (!hasCoords(device)) return;
        const pos = [device.lat, device.lng];

        if (first.current) {
            map.setView(pos, FOCUS_ZOOM, { animate: false });
            first.current = false;
        } else {
            map.flyTo(pos, Math.max(map.getZoom(), FOCUS_ZOOM), { duration: 0.8 });
        }
    }, [map, device?.id, device?.lat, device?.lng]); // eslint-disable-line react-hooks/exhaustive-deps

    return null;
}

export default function SoilMap({ devices, selected, readings, onSelect }) {
    const mappable = devices.filter(hasCoords);

    return (
        <div className="relative isolate overflow-hidden rounded-xl border border-brand/20 shadow-inner">
            <MapContainer
                center={DEFAULT_CENTER}
                zoom={FOCUS_ZOOM}
                maxZoom={19}
                scrollWheelZoom
                className="h-[380px] w-full md:h-[460px]"
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Satelit">
                        <LayerGroup>
                            <TileLayer
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
                                maxNativeZoom={18}
                                maxZoom={19}
                            />
                            {/* Label jalan dan tempat di atas citra satelit */}
                            <TileLayer
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                                maxNativeZoom={18}
                                maxZoom={19}
                            />
                        </LayerGroup>
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Peta">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                            maxZoom={19}
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                <ScaleControl position="bottomleft" imperial={false} />
                <FlyToSelected device={selected} />

                {mappable.map(d => (
                    <DeviceMarker
                        key={d.id}
                        device={d}
                        query={readings[d.id]}
                        selected={d.id === selected?.id}
                        onSelect={onSelect}
                    />
                ))}
            </MapContainer>

            {devices.length > 0 && mappable.length === 0 && (
                <div className="absolute inset-x-0 top-3 z-[500] mx-auto w-fit rounded-md bg-white/90 px-3 py-1.5 text-xs text-bad shadow">
                    Tidak ada device yang memiliki koordinat (lat/lng).
                </div>
            )}
        </div>
    );
}
