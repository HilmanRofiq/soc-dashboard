import clsx from "clsx";

export default function StatusDot({ online, className }) {
    return (
        <span
            aria-label={online ? "online" : "offline"}
            className={clsx(
                "inline-block size-3 shrink-0 rounded-full border border-ink/40",
                online ? "bg-good" : "bg-bad",
                className,
            )}
        />
    );
}
