import clsx from "clsx";
import { ChartLine, House, MapPin } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const NAV = [
    { to: "/", icon: House, label: "Home" },
    { to: "/analytics", icon: ChartLine, label: "Analytics" },
    { to: "/map", icon: MapPin, label: "Map" },
];

export default function AppLayout() {
    return (
        <div className="flex min-h-screen">
            <aside className="flex w-14 flex-col items-center gap-8 bg-glass py-6">
                {NAV.map(({ to, icon: Icon, label }) => (
                    <NavLink key={to} to={to} end aria-label={label} title={label}>
                        {({ isActive }) => (
                            <Icon size={32} className={clsx(isActive ? "text-ink" : "text-ink/60", "transition")} />
                        )}
                    </NavLink>
                ))}
            </aside>
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
}
