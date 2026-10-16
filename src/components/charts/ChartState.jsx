import clsx from "clsx";

export default function ChartState({ isLoading, error, isEmpty, height, children }) {
    const box = "flex items-center justify-center rounded-lg text-sm";

    if (isLoading) {
        return (
            <div style={{ height }} className={clsx(box, "animate-pulse bg-ink/5 text-ink/50")}>
                Memuat grafik...
            </div>
        );
    }
    if (error) {
        return (
            <div role="alert" style={{ height }} className={clsx(box, "bg-bad/10 px-4 text-center text-bad")}>
                Gagal memuat grafik: {error.message}
            </div>
        );
    }
    if (isEmpty) {
        return (
            <div style={{ height }} className={clsx(box, "bg-ink/5 text-ink/50")}>
                Tidak ada data pada rentang ini.
            </div>
        );
    }
    return children;
}
