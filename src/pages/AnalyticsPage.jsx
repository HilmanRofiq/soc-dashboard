import DateRangePanel from "@/components/cards/DateRangePanel";
import DeviceList from "@/components/cards/DeviceList";
import MainChartCard from "@/components/cards/MainChartCard";
import MiniChartCard from "@/components/cards/MiniChartCard";
import { useDevice } from "@/context/DeviceContext";
import { useLatestReading } from "@/hooks/useLatestReading";
import { getPresetRange } from "@/utils/date";
import { useState } from "react";

const NPK = ["n", "p", "k"];

export default function AnalyticsPage() {
    const { selected, selectedId } = useDevice();
    const { data: latest } = useLatestReading(selectedId);

    // Default: 7 hari terakhir. Dipakai bersama oleh semua grafik di halaman ini.
    const [range, setRange] = useState(() => getPresetRange(7));

    return (
        <div className="flex flex-col gap-6">
            {/* Baris atas: mini-chart NPK */}
            <div className="grid gap-6 md:grid-cols-3">
                {NPK.map(key => (
                    <MiniChartCard
                        key={key}
                        sensorKey={key}
                        deviceId={selectedId}
                        range={range}
                        latestValue={latest?.[key]}
                    />
                ))}
            </div>

            {/* Baris bawah: chart besar + panel kanan */}
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                <MainChartCard device={selected} deviceId={selectedId} latest={latest} range={range} />

                <div className="flex flex-col gap-6">
                    <DeviceList />
                    <DateRangePanel value={range} onChange={setRange} />
                </div>
            </div>
        </div>
    );
}
