import { mockDevices } from "@/mocks/data";
import { api, USE_MOCK } from "./client";

// Asumsi respons: [{ id, name, online, lat, lng, imageUrl }]
export async function fetchDevices() {
    if (USE_MOCK) return mockDevices;
    const { data } = await api.get("/devices");
    return data;
}
