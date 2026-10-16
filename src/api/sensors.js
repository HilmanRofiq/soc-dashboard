import { mockHistory, mockLatest } from "@/mocks/data";
import { rangeToISO } from "@/utils/date";
import { api, USE_MOCK } from "./client";

// Asumsi respons: { soc, n, p, k, ph, moist, ec, temp, timestamp }
export async function fetchLatest(deviceId) {
    if (USE_MOCK) return mockLatest;
    const { data } = await api.get(`/devices/${deviceId}/readings/latest`);
    return data;
}

// Asumsi respons: [{ timestamp, value }]
// sensor: "soc" | "n" | "p" | "k" | "ph" | "moist" | "ec" | "temp"
// range: "7d" | "24h" | ...
export async function fetchHistory(deviceId, sensor, range) {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 300)); // simulasi loading
        return mockHistory(sensor, range);
    }
    const { data } = await api.get(`/devices/${deviceId}/readings`, {
        params: { sensor, ...rangeToISO(range) }, // from & to dalam format ISO
    });
    return data;
}
