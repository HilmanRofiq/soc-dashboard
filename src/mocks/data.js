import { daysBetween } from "@/utils/date";

export const mockDevices = [
    {
        id: "soc-portable",
        name: "SOC Portable",
        online: true,
        lat: -6.9725,
        lng: 107.6303,
        imageUrl: "/images/devices/soc-portable.jpg",
    },
    { id: "deli", name: "Deli", online: true, lat: -6.976, lng: 107.635, imageUrl: "/images/devices/deli.jpg" },
    {
        id: "btp",
        name: "Bandung Techno Park",
        online: false,
        lat: -6.97,
        lng: 107.628,
        imageUrl: "/images/devices/btp.jpg",
    },
];

export const mockLatest = {
    soc: 75.5,
    n: 65,
    p: 58,
    k: 180,
    ph: 6.8,
    moist: 45,
    ec: 520,
    temp: 28,
    timestamp: new Date().toISOString(),
};

export const mockHistory = (sensor, { from, to }) => {
    const span = daysBetween(from, to);
    const hourly = span <= 2;
    const step = hourly ? 3_600_000 : 86_400_000;
    const count = hourly ? span * 24 : span;
    const start = new Date(`${from}T00:00:00`).getTime();
    const base = mockLatest[sensor] ?? 0;

    return Array.from({ length: count }, (_, i) => {
        const wave = Math.sin(i / (hourly ? 4 : 2.5)) * 0.08;
        const r = Math.abs(Math.sin((i + 1) * 12.9898 + sensor.charCodeAt(0) * 78.233) * 43758.5453) % 1;
        const noise = (r - 0.5) * 0.06;
        return {
            timestamp: new Date(start + i * step).toISOString(),
            value: +(base * (1 + wave + noise)).toFixed(2),
        };
    }).filter(p => new Date(p.timestamp).getTime() <= Date.now()); // jangan tampilkan jam di masa depan
};
