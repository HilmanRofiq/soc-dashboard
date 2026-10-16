import { CircleHelp, Frown, Meh, Smile } from "lucide-react";

const MAP = {
    good: { Icon: Smile, cls: "text-good" },
    warn: { Icon: Meh, cls: "text-warn" },
    bad: { Icon: Frown, cls: "text-bad" },
    unknown: { Icon: CircleHelp, cls: "text-ink/40" },
};

export default function StatusFace({ status, size = 32 }) {
    const { Icon, cls } = MAP[status] ?? MAP.unknown;
    return <Icon size={size} strokeWidth={1.5} className={cls} />;
}
