import StatusDot from "@/components/ui/StatusDot";
import StatusFace from "@/components/ui/StatusFace";
import { SENSORS } from "@/config/sensors";
import { formatFull } from "@/utils/date";
import { getStatus } from "@/utils/status";

const NPK = ["n", "p", "k"];

/**
 * Isi tooltip (hover) dan popup (klik) pada marker.
 * Pakai <div>/<span>, bukan <p>, karena Leaflet memberi margin pada <p> di popup.
 */
export default function DeviceInfoCard({ device, query, showTime = false }) {
    const { data, isLoading, error } = query ?? {};

    return (
        <div className="min-w-[180px] text-ink">
            <div className="mb-1.5 flex items-center justify-between gap-4">
                <span className="font-bold">{device.name}</span>
                <StatusDot online={device.online} className="size-2.5" />
            </div>

            {isLoading && <div className="text-xs text-ink/60">Memuat data...</div>}

            {!isLoading && (error || !data) && <div className="text-xs text-bad">Data tidak tersedia</div>}

            {!isLoading && data && (
                <ul className="space-y-1">
                    {NPK.map(key => {
                        const cfg = SENSORS[key];
                        const value = data[key];
                        return (
                            <li key={key} className="flex items-center gap-2 text-sm">
                                <StatusFace status={getStatus(key, value)} size={16} />
                                <span className="w-16">{cfg.label}</span>
                                <span className="ml-auto font-bold text-brand">{value ?? "-"}</span>
                                <span className="text-xs text-ink/60">{cfg.unit}</span>
                            </li>
                        );
                    })}
                </ul>
            )}

            {!device.online && (
                <div className="mt-1.5 text-[11px] text-bad">Device offline, data mungkin bukan yang terbaru.</div>
            )}

            {showTime && data?.timestamp && (
                <div className="mt-1.5 text-[11px] text-ink/50">Diperbarui: {formatFull(data.timestamp)}</div>
            )}
        </div>
    );
}
