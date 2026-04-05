import type { ReactNode } from "react";
import BottomTabBar from "./BottomTabBar";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div
            className="mx-auto min-h-screen max-w-md relative flex flex-col"
            style={{ background: 'var(--color-bg)' }}
        >
            {/* Top status bar accent line */}
            <div
                className="w-full h-[2px] flex-shrink-0"
                style={{ background: 'var(--color-accent)' }}
            />

            <main className="flex-1 relative pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
                {children}
            </main>

            <BottomTabBar />
        </div>
    );
}
