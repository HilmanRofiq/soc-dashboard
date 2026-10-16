import StatusDot from "@/components/ui/StatusDot";
import { useDevice } from "@/context/DeviceContext";
import clsx from "clsx";

export default function DeviceList() {
    const { devices, selectedId, setSelectedId, isLoading, error } = useDevice();

    return (
        <section className="glass-card p-4">
            <h2 className="mb-3 text-lg font-bold">Device Location</h2>

            <div className="flex flex-col gap-2 rounded-xl border border-brand/20 bg-white/40 p-2">
                {isLoading && <p className="px-2 py-3 text-sm text-ink/60">Memuat daftar device...</p>}

                {error && <p className="px-2 py-3 text-sm text-bad">Gagal memuat device: {error.message}</p>}

                {!isLoading && !error && devices.length === 0 && (
                    <p className="px-2 py-3 text-sm text-ink/60">Belum ada device.</p>
                )}

                {devices.map(d => {
                    const active = d.id === selectedId;
                    return (
                        <button
                            key={d.id}
                            type="button"
                            onClick={() => setSelectedId(d.id)}
                            aria-pressed={active}
                            style={d.imageUrl && !active ? { backgroundImage: `url(${d.imageUrl})` } : undefined}
                            className={clsx(
                                "relative flex items-center justify-between overflow-hidden rounded-lg",
                                "bg-cover bg-center px-4 py-1.5 text-left text-lg text-white shadow-md transition",
                                active ? "bg-brand" : "bg-ink hover:brightness-110",
                            )}
                        >
                            {/* Overlay gelap supaya teks tetap terbaca di atas foto */}
                            {!active && (
                                <span className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
                            )}
                            <span className="relative z-10 truncate">{d.name}</span>
                            <StatusDot online={d.online} className="relative z-10" />
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
