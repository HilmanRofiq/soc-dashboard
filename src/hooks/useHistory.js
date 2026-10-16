import { fetchHistory } from "@/api/sensors";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useHistory = (deviceId, sensor, range) =>
    useQuery({
        queryKey: ["history", deviceId, sensor, range?.from, range?.to],
        queryFn: () => fetchHistory(deviceId, sensor, range),
        enabled: !!deviceId && !!range?.from && !!range?.to,
        // Grafik lama tetap tampil (agak pudar) selagi rentang baru dimuat
        placeholderData: keepPreviousData,
    });
