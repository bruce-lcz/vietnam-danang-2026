import { Map, Utensils, BookOpen, Wrench } from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const BTM_TABS = [
    { id: "itinerary", icon: Map, label: "行程", path: "/itinerary" },
    { id: "dining", icon: Utensils, label: "美食", path: "/dining" },
    { id: "info", icon: BookOpen, label: "須知", path: "/info" },
    { id: "tools", icon: Wrench, label: "工具", path: "/tools" },
];

export default function BottomTabBar() {
    return (
        <nav
            className="fixed bottom-0 left-[50%] -translate-x-1/2 w-full max-w-md z-40"
            style={{
                background: 'rgba(246,245,241,0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderTop: '1px solid var(--color-border)',
                paddingBottom: 'env(safe-area-inset-bottom)',
            }}
        >
            <ul className="flex justify-around items-stretch h-[58px]">
                {BTM_TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <li key={tab.id} className="flex-1">
                            <NavLink
                                to={tab.path}
                                className={({ isActive }) =>
                                    clsx(
                                        "flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-200 relative",
                                        isActive
                                            ? "text-[var(--color-accent)]"
                                            : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <span
                                                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px]"
                                                style={{ background: 'var(--color-accent)' }}
                                            />
                                        )}
                                        <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                                        <span
                                            className="text-[10px] font-semibold tracking-wider"
                                            style={{ fontFamily: 'var(--font-mono)' }}
                                        >
                                            {tab.label}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
