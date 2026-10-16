import ChartState from "@/components/charts/ChartState";
import SensorAreaChart from "@/components/charts/SensorAreaChart";
import StatusFace from "@/components/ui/StatusFace";
import { SENSORS } from "@/config/sensors";
import { useHistory } from "@/hooks/useHistory";
import { daysBetween, formatRangeLabel } from "@/utils/date";
import { getStatus } from "@/utils/status";
import clsx from "clsx";
import { useMemo, useState } from "react";

const TABS = ["soc", "moist", "ec", "ph", "temp"];
const CHART_HEIGHT = 380;

const round = n => Number(n.toFixed(2));

export default function MainChartCard({ device, deviceId, latest, range }) {
    const [sensorKey, setSensorKey] = useState("soc");
    const cfg = SENSORS[sensorKey];
    const latestValue = latest?.[sensorKey];
    const status = getStatus(sensorKey, latestValue);

    const { data, isLoading, isFetching, error } = useHistory(deviceId, sensorKey, range);

    // Ringkasan statistik untuk rentang yang dipilih
    const stats = useMemo(() => {
        const values = (data ?? []).map(d => d.value).filter(Number.isFinite);
        if (!values.length) return null;
        const sum = values.reduce((a, b) => a + b, 0);
        return {
            min: round(Math.min(...values)),
            avg: round(sum / values.length),
            max: round(Math.max(...values)),
        };
    }, [data]);

    return (
        <section className="glass-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-3xl font-bold">{cfg.label}:</h2>
                    <p className="mt-1 text-xs text-ink/60">
                        {device?.name ?? "-"} · {formatRangeLabel(range)}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <StatusFace status={status} size={36} />
                    <span className="text-3xl font-bold text-brand">{latestValue ?? "-"}</span>
                    <span className="text-ink/60">{cfg.unit}</span>
                </div>
            </div>

            <div className={clsx("mt-4 transition-opacity", isFetching && !isLoading && "opacity-60")}>
                <ChartState isLoading={isLoading} error={error} isEmpty={!data?.length} height={CHART_HEIGHT}>
                    <SensorAreaChart
                        data={data ?? []}
                        sensorKey={sensorKey}
                        status={status === "unknown" ? "good" : "good"}
                        spanDays={daysBetween(range.from, range.to)}
                        height={CHART_HEIGHT}
                        showGoodBand
                    />
                </ChartState>
            </div>

            {/* Tab sensor */}
            <div role="tablist" className="mt-4 flex flex-wrap justify-center gap-3">
                {TABS.map(key => {
                    const active = key === sensorKey;
                    return (
                        <button
                            key={key}
                            role="tab"
                            type="button"
                            aria-selected={active}
                            onClick={() => setSensorKey(key)}
                            className={clsx(
                                "rounded-md px-4 py-1 text-sm font-semibold text-white shadow transition",
                                active ? "bg-brand" : "bg-ink hover:brightness-125",
                            )}
                        >
                            {SENSORS[key].label}
                        </button>
                    );
                })}
            </div>

            {/* Ringkasan rentang */}
            {stats && (
                <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
                    {[
                        ["Terendah", stats.min],
                        ["Rata-rata", stats.avg],
                        ["Tertinggi", stats.max],
                    ].map(([label, val]) => (
                        <div key={label} className="rounded-lg border border-brand/20 bg-white/40 py-2">
                            <dt className="text-xs text-ink/60">{label}</dt>
                            <dd className="font-bold text-brand">
                                {val} <span className="text-xs font-normal text-ink/60">{cfg.unit}</span>
                            </dd>
                        </div>
                    ))}
                </dl>
            )}
        </section>
    );
}
