import { api, USE_MOCK } from "./client";

// Asumsi: POST /chat { deviceId, message } -> { reply }
export async function sendChat(deviceId, message) {
    if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 600));
        return { reply: "Ini balasan contoh dari asisten (mode mock)." };
    }
    const { data } = await api.post("/chat", { deviceId, message });
    return data;
}
