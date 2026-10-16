import ChartState from "@/components/charts/ChartState";
import SensorAreaChart from "@/components/charts/SensorAreaChart";
import StatusFace from "@/components/ui/StatusFace";
import { SENSORS } from "@/config/sensors";
import { useHistory } from "@/hooks/useHistory";
import { daysBetween } from "@/utils/date";
import { getStatus } from "@/utils/status";
import clsx from "clsx";

export default function MiniChartCard({ sensorKey, deviceId, range, latestValue }) {
    const cfg = SENSORS[sensorKey];
    const status = getStatus(sensorKey, latestValue);
    const { data, isLoading, isFetching, error } = useHistory(deviceId, sensorKey, range);

    return (
        <section className="glass-card p-4">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-bold">{cfg.label}:</h3>
                <div className="flex items-center gap-2">
                    <StatusFace status={status} size={24} />
                    <span className="font-bold text-brand">{latestValue ?? "-"}</span>
                    <span className="text-sm text-ink/60">{cfg.unit}</span>
                </div>
            </div>

            <div className={clsx("transition-opacity", isFetching && !isLoading && "opacity-60")}>
                <ChartState isLoading={isLoading} error={error} isEmpty={!data?.length} height={150}>
                    <SensorAreaChart
                        data={data ?? []}
                        sensorKey={sensorKey}
                        status={status}
                        spanDays={daysBetween(range.from, range.to)}
                        height={150}
                        compact
                    />
                </ChartState>
            </div>
        </section>
    );
}
