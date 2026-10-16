import { SENSORS } from "@/config/sensors";
import { formatFull, formatTick } from "@/utils/date";
import { Area, AreaChart, CartesianGrid, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = {
    good: "#2f9be8",
    warn: "#f0b400",
    bad: "#e8420f",
    unknown: "#94a3b8",
};

export default function SensorAreaChart({
    data,
    sensorKey,
    status = "good",
    spanDays,
    height = 220,
    compact = false,
    showGoodBand = false, // arsiran hijau = zona ideal (dari config threshold)
}) {
    const cfg = SENSORS[sensorKey];
    const color = COLORS[status] ?? COLORS.unknown;
    const gradientId = `grad-${sensorKey}-${compact ? "m" : "l"}`;
    const fontSize = compact ? 9 : 12;

    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#00000020" />

                {showGoodBand && (
                    <ReferenceArea
                        y1={cfg.good[0]}
                        y2={cfg.good[1]}
                        fill="#16d92b"
                        fillOpacity={0.1}
                        ifOverflow="hidden"
                    />
                )}

                <XAxis
                    dataKey="timestamp"
                    tickFormatter={v => formatTick(v, spanDays)}
                    tick={{ fontSize }}
                    minTickGap={compact ? 24 : 40}
                />
                <YAxis tick={{ fontSize }} width={compact ? 34 : 48} domain={["auto", "auto"]} />

                <Tooltip
                    labelFormatter={formatFull}
                    formatter={v => [`${v} ${cfg.unit}`.trim(), cfg.label]}
                    contentStyle={{ borderRadius: 8, fontSize: 12 }}
                />

                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    fill={`url(#${gradientId})`}
                    dot={
                        data.length <= 31 ? { r: compact ? 2 : 3, fill: "#fff", stroke: color, strokeWidth: 2 } : false
                    }
                    activeDot={{ r: 5 }}
                    isAnimationActive={false}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
