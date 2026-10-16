import DeviceList from "@/components/cards/DeviceList";
import SensorCard from "@/components/cards/SensorCard";
import SoilMap from "@/components/map/SoilMap";
import { MAP_SENSOR_ORDER } from "@/config/sensors";
import { useDevice } from "@/context/DeviceContext";
import { useAllLatest } from "@/hooks/useAllLatest";
import { useLatestReading } from "@/hooks/useLatestReading";

export default function MapPage() {
    const { devices, selected, selectedId, setSelectedId } = useDevice();
    const { data: latest } = useLatestReading(selectedId); // untuk 8 kartu di bawah peta
    const readings = useAllLatest(devices); // untuk popup tiap marker

    return (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            {/* Kiri: peta + 8 kartu sensor */}
            <div className="flex flex-col gap-6">
                <section className="glass-card p-5">
                    <div className="mb-3 text-center">
                        <h1 className="text-3xl font-extrabold text-brand">Soil Monitor Map</h1>
                        <p className="text-sm font-semibold">{selected?.name ?? "-"}</p>
                    </div>

                    <SoilMap devices={devices} selected={selected} readings={readings} onSelect={setSelectedId} />
                </section>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {MAP_SENSOR_ORDER.map(key => (
                        <SensorCard key={key} sensorKey={key} value={latest?.[key]} />
                    ))}
                </div>
            </div>

            {/* Kanan: daftar device */}
            <div>
                <DeviceList />
            </div>
        </div>
    );
}
