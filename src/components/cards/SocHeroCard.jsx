import StatusDot from "@/components/ui/StatusDot";
import { SENSORS } from "@/config/sensors";

export default function SocHeroCard({ device, value, isLoading }) {
    const cfg = SENSORS.soc;
    const online = device?.online ?? false;

    return (
        <section className="glass-card relative min-h-[460px] overflow-hidden p-6 md:min-h-[580px]">
            {/* Latar hijau lembut */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand/5" />

            {/* Nilai SOC */}
            <div className="relative z-10">
                <h2 className="text-4xl font-extrabold text-brand">{cfg.label}</h2>
                <p className="mt-1 pl-2 text-4xl font-light text-ink/80">
                    {isLoading ? "..." : (value ?? "-")}
                    {value != null && <span className="ml-1 text-lg text-ink/60">{cfg.unit}</span>}
                </p>
            </div>

            {/* Status online */}
            <div className="absolute right-5 top-4 z-10 flex flex-col items-center">
                <StatusDot online={online} className="size-5" />
                <span className={online ? "text-[10px] text-brand" : "text-[10px] text-bad"}>
                    {online ? "online" : "offline"}
                </span>
            </div>

            {/* Gambar 3D tanah */}
            <img
                src="/public/images/Isometric Diorama.png"
                alt="Ilustrasi alat pemantau tanah"
                className="absolute left-1/2 top-1/2 z-0 w-[55%] max-w-md -translate-x-1/2 -translate-y-[55%] object-contain drop-shadow-2xl"
                onError={e => (e.currentTarget.style.display = "none")}
            />

            {/* Nama device */}
            <h3 className="absolute bottom-5 left-6 z-10 text-4xl font-extrabold text-ink">
                {device?.name ?? "Pilih device"}
            </h3>
        </section>
    );
}
