import { MAX_RANGE_DAYS, daysBetween, getPresetRange, isSameRange, toInputDate } from "@/utils/date";
import clsx from "clsx";
import { CalendarRange } from "lucide-react";
import { useEffect, useState } from "react";

const PRESETS = [
    { id: "today", label: "Hari ini", days: 1 },
    { id: "7d", label: "7 hari", days: 7 },
    { id: "30d", label: "30 hari", days: 30 },
];

export default function DateRangePanel({ value, onChange }) {
    const [draft, setDraft] = useState(value);
    const today = toInputDate(new Date());

    // Sinkronkan input saat rentang berubah dari luar (misalnya klik preset)
    useEffect(() => setDraft(value), [value]);

    const activePreset = PRESETS.find(p => isSameRange(getPresetRange(p.days), value))?.id ?? "custom";

    const error = (() => {
        if (!draft.from || !draft.to) return "Isi kedua tanggal.";
        if (draft.from > draft.to) return "Tanggal awal tidak boleh setelah tanggal akhir.";
        if (draft.to > today) return "Tanggal akhir tidak boleh di masa depan.";
        if (daysBetween(draft.from, draft.to) > MAX_RANGE_DAYS) return `Rentang maksimal ${MAX_RANGE_DAYS} hari.`;
        return null;
    })();

    const dirty = !isSameRange(draft, value);

    const inputCls =
        "w-full rounded-md border border-ink/30 bg-white px-2 py-1.5 text-sm outline-none focus:border-brand";

    return (
        <section className="glass-card p-4">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
                <CalendarRange size={20} className="text-brand" />
                Rentang Data
            </h2>

            {/* Preset */}
            <div className="flex gap-2">
                {PRESETS.map(p => (
                    <button
                        key={p.id}
                        type="button"
                        onClick={() => onChange(getPresetRange(p.days))}
                        className={clsx(
                            "flex-1 rounded-md px-2 py-1.5 text-sm font-semibold text-white shadow transition",
                            activePreset === p.id ? "bg-brand" : "bg-ink hover:brightness-125",
                        )}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Kustom */}
            <div className="mt-4 rounded-xl border border-brand/20 bg-white/40 p-3">
                <p className="mb-2 text-xs font-semibold text-ink/70">
                    Kustom {activePreset === "custom" && "(aktif)"}
                </p>

                <div className="grid grid-cols-2 gap-3">
                    <label className="text-xs text-ink/70">
                        Dari
                        <input
                            type="date"
                            max={today}
                            value={draft.from}
                            onChange={e => setDraft(d => ({ ...d, from: e.target.value }))}
                            className={clsx(inputCls, "mt-1")}
                        />
                    </label>
                    <label className="text-xs text-ink/70">
                        Sampai
                        <input
                            type="date"
                            max={today}
                            value={draft.to}
                            onChange={e => setDraft(d => ({ ...d, to: e.target.value }))}
                            className={clsx(inputCls, "mt-1")}
                        />
                    </label>
                </div>

                {error && (
                    <p role="alert" className="mt-2 text-xs text-bad">
                        {error}
                    </p>
                )}

                <button
                    type="button"
                    disabled={!!error || !dirty}
                    onClick={() => onChange(draft)}
                    className="mt-3 w-full rounded-md bg-brand py-1.5 text-sm font-semibold text-white shadow transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Terapkan
                </button>
            </div>

            {!error && (
                <p className="mt-3 text-xs text-ink/60">
                    Menampilkan {daysBetween(value.from, value.to)} hari
                    {daysBetween(value.from, value.to) <= 2 ? " (per jam)" : " (per hari)"}.
                </p>
            )}
        </section>
    );
}
