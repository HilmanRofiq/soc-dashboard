import { SENSORS } from "@/config/sensors";
import { getStatus } from "@/utils/status";

export default function SensorCard({ sensorKey, value }) {
    const cfg = SENSORS[sensorKey];
    if (!cfg) return null;

    const status = value != null ? getStatus(sensorKey, value) : null;
    const statusColor =
        {
            good: "text-good",
            warn: "text-warn",
            bad: "text-bad",
            unknown: "text-ink/60",
        }[status] || "text-ink/60";

    return (
        <div className="glass-card flex flex-col justify-center px-4 py-3">
            <p className="text-xs text-ink/60">{cfg.label}</p>
            <p className={`mt-1 text-2xl font-semibold ${statusColor}`}>
                {value != null ? value : "-"}
                <span className="ml-1 text-sm">{cfg.unit}</span>
            </p>
        </div>
    );
}
