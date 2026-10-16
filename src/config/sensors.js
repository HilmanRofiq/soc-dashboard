export const SENSORS = {
    soc: { label: "SOC", unit: "%", good: [2, 10], warn: [1, 15] },
    n: { label: "Nitrogen", unit: "ppm", good: [40, 100], warn: [20, 150] },
    p: { label: "Phosphor", unit: "ppm", good: [50, 100], warn: [30, 150] },
    k: { label: "Kalium", unit: "ppm", good: [100, 250], warn: [50, 350] },
    ph: { label: "pH", unit: "", good: [6, 7.5], warn: [5.5, 8] },
    moist: { label: "Moist", unit: "%", good: [30, 60], warn: [20, 70] },
    ec: { label: "EC", unit: "µS/cm", good: [200, 800], warn: [100, 1500] },
    temp: { label: "Temp", unit: "°C", good: [20, 30], warn: [15, 35] },
};

// Urutan tampil di kartu Home
export const HOME_SENSOR_ORDER = ["n", "p", "k", "ph", "moist", "ec"];
export const MAP_SENSOR_ORDER = ["soc", "n", "p", "k", "temp", "ph", "moist", "ec"];
