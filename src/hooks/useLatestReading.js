import { fetchLatest } from "@/api/sensors";
import { useQuery } from "@tanstack/react-query";

export const useLatestReading = deviceId =>
    useQuery({
        queryKey: ["latest", deviceId],
        queryFn: () => fetchLatest(deviceId),
        enabled: !!deviceId,
        refetchInterval: 10_000, // polling tiap 10 detik
    });
