import DeviceList from "@/components/cards/DeviceList";
import SensorCard from "@/components/cards/SensorCard";
import SocHeroCard from "@/components/cards/SocHeroCard";
import ChatPanel from "@/components/chat/ChatPanel";
import { HOME_SENSOR_ORDER, SENSORS } from "@/config/sensors";
import { useDevice } from "@/context/DeviceContext";
import { useLatestReading } from "@/hooks/useLatestReading";
import { TriangleAlert } from "lucide-react";

function formatTime(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function HomePage() {
    const { selected, selectedId } = useDevice();
    const { data, isLoading, error } = useLatestReading(selectedId);

    const updatedAt = formatTime(data?.timestamp);

    return (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            {/* Kolom kiri */}
            <div className="flex flex-col gap-6">
                {error && (
                    <div
                        role="alert"
                        className="flex items-center gap-2 rounded-lg border border-bad/40 bg-bad/10 px-4 py-2 text-sm text-bad"
                    >
                        <TriangleAlert size={18} />
                        Gagal memuat data sensor: {error.message}
                    </div>
                )}

                {selected && !selected.online && (
                    <div className="flex items-center gap-2 rounded-lg border border-warn/40 bg-warn/10 px-4 py-2 text-sm">
                        <TriangleAlert size={18} className="text-warn" />
                        Device sedang offline. Data yang tampil mungkin bukan data terbaru.
                    </div>
                )}

                <SocHeroCard device={selected} value={data?.soc} isLoading={isLoading} />

                {/* Temp + 6 kartu sensor */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="glass-card col-span-2 flex flex-col justify-center px-5 py-4 md:col-span-1 md:row-span-2">
                        <p className="text-2xl">Temp:</p>
                        <p className="mt-2 text-center text-4xl font-light text-brand">
                            {data?.temp != null ? `${data.temp}${SENSORS.temp.unit}` : "-"}
                        </p>
                    </div>

                    {HOME_SENSOR_ORDER.map(key => (
                        <SensorCard key={key} sensorKey={key} value={data?.[key]} />
                    ))}
                </div>

                {updatedAt && <p className="text-xs text-ink/50">Terakhir diperbarui: {updatedAt}</p>}
            </div>

            {/* Kolom kanan */}
            <div className="flex flex-col gap-6">
                <DeviceList />
                <ChatPanel />
            </div>
        </div>
    );
}
