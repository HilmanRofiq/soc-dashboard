export const MAX_RANGE_DAYS = 90;

const pad = n => String(n).padStart(2, "0");

/** Date -> "YYYY-MM-DD" (waktu lokal, cocok untuk <input type="date">) */
export function toInputDate(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Rentang yang berakhir hari ini. days=1 -> hari ini saja, days=7 -> 7 hari terakhir */
export function getPresetRange(days) {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - (days - 1));
    return { from: toInputDate(from), to: toInputDate(to) };
}

export function isSameRange(a, b) {
    return a?.from === b?.from && a?.to === b?.to;
}

/** Jumlah hari (inklusif): 2026-09-30 s/d 2026-09-30 = 1 hari */
export function daysBetween(from, to) {
    const a = new Date(`${from}T00:00:00`);
    const b = new Date(`${to}T00:00:00`);
    return Math.round((b - a) / 86_400_000) + 1;
}

/** Ubah rentang tanggal menjadi ISO (awal hari s/d akhir hari) untuk dikirim ke API */
export function rangeToISO({ from, to }) {
    return {
        from: new Date(`${from}T00:00:00`).toISOString(),
        to: new Date(`${to}T23:59:59`).toISOString(),
    };
}

/** Label sumbu X: jam jika rentang pendek, tanggal jika panjang */
export function formatTick(ts, spanDays) {
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return String(ts);
    return spanDays <= 2
        ? d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        : d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
}

/** Label lengkap untuk tooltip */
export function formatFull(ts) {
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return String(ts);
    return d.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/** "30 Sep 2026" atau "24 Sep 2026 – 30 Sep 2026" */
export function formatRangeLabel({ from, to }) {
    const fmt = s =>
        new Date(`${s}T00:00:00`).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    return from === to ? fmt(from) : `${fmt(from)} – ${fmt(to)}`;
}
