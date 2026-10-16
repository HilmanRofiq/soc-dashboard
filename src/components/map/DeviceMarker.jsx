import L from "leaflet";
import { useMemo } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import DeviceInfoCard from "./DeviceInfoCard";

const COLOR = { online: "#16a34a", offline: "#e8420f" };

function createPinIcon({ online, selected }) {
    const w = selected ? 38 : 30;
    const h = Math.round((w * 32) / 24);
    const color = online ? COLOR.online : COLOR.offline;

    const html = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="${w}" height="${h}"
         style="display:block;filter:drop-shadow(0 2px 3px rgba(0,0,0,.55))">
      <path d="M12 1C5.9 1 1 5.9 1 12c0 8.3 11 19 11 19s11-10.7 11-19C23 5.9 18.1 1 12 1z"
            fill="${color}" stroke="#fff" stroke-width="${selected ? 2.5 : 1.5}" />
      <circle cx="12" cy="12" r="4.5" fill="#fff" />
    </svg>`;

    return L.divIcon({
        className: "", // hilangkan kotak putih bawaan divIcon
        html,
        iconSize: [w, h],
        iconAnchor: [w / 2, h], // ujung bawah pin = koordinat device
        popupAnchor: [0, -h],
        tooltipAnchor: [0, -h],
    });
}

export default function DeviceMarker({ device, query, selected, onSelect }) {
    const icon = useMemo(() => createPinIcon({ online: device.online, selected }), [device.online, selected]);

    const handlers = useMemo(
        () => ({
            click: () => onSelect(device.id),
            // Cegah tooltip (hover) menumpuk di atas popup (klik)
            popupopen: e => e.target.closeTooltip(),
            tooltipopen: e => {
                if (e.target.isPopupOpen()) e.target.closeTooltip();
            },
        }),
        [device.id, onSelect],
    );

    return (
        <Marker
            position={[device.lat, device.lng]}
            icon={icon}
            eventHandlers={handlers}
            riseOnHover
            zIndexOffset={selected ? 1000 : 0}
        >
            {/* Hover */}
            <Tooltip direction="top" opacity={1}>
                <DeviceInfoCard device={device} query={query} />
            </Tooltip>

            {/* Klik / tap (di layar sentuh tidak ada hover, jadi popup ini yang muncul) */}
            <Popup autoPanPadding={[40, 40]}>
                <DeviceInfoCard device={device} query={query} showTime />
            </Popup>
        </Marker>
    );
}
