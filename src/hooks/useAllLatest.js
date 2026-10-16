import { fetchLatest } from "@/api/sensors";
import { useQueries } from "@tanstack/react-query";

/**
 * Ambil data sensor terbaru untuk SEMUA device sekaligus.
 * @returns {Record<string, import("@tanstack/react-query").UseQueryResult>}
 *          objek { [deviceId]: hasilQuery }
 */
export function useAllLatest(devices) {
    const results = useQueries({
        queries: devices.map(d => ({
            queryKey: ["latest", d.id], // sama dengan useLatestReading -> cache dipakai bersama
            queryFn: () => fetchLatest(d.id),
            refetchInterval: 10_000,
        })),
    });

    return Object.fromEntries(devices.map((d, i) => [d.id, results[i]]));
}
