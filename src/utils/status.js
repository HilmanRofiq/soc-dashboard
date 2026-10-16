import { SENSORS } from "@/config/sensors";

const within = (v, [min, max]) => v >= min && v <= max;

/** @returns {"good" | "warn" | "bad" | "unknown"} */
export function getStatus(key, value) {
    const cfg = SENSORS[key];
    if (!cfg || value === null || value === undefined || Number.isNaN(value)) {
        return "unknown";
    }
    if (within(value, cfg.good)) return "good";
    if (within(value, cfg.warn)) return "warn";
    return "bad";
}
