import clsx from "clsx";

interface DaySelectorProps {
    days: { day: number; date: string; title: string; summary?: string }[];
    selectedDay: number;
    onSelectDay: (day: number) => void;
}

export default function DaySelector({ days, selectedDay, onSelectDay }: DaySelectorProps) {
    return (
        <div
            className="w-full overflow-x-auto no-scrollbar px-4 py-3 sticky top-0 z-30"
            style={{
                background: '#141413',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            <div className="flex gap-2">
                {days.map((d) => {
                    const isActive = selectedDay === d.day;
                    return (
                        <button
                            key={d.day}
                            onClick={() => onSelectDay(d.day)}
                            className={clsx(
                                "flex flex-col items-center justify-center min-w-[62px] h-[64px] rounded-lg transition-all duration-200 flex-shrink-0",
                            )}
                            style={
                                isActive
                                    ? {
                                        background: 'var(--color-accent)',
                                        color: '#ffffff',
                                        boxShadow: '0 4px 12px rgba(235, 128, 84, 0.25)',
                                        border: '1px solid var(--color-accent)'
                                    }
                                    : {
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'rgba(255,255,255,0.65)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                    }
                            }
                        >
                            <span
                                className="text-[9px] font-bold tracking-widest uppercase"
                                style={{ fontFamily: 'var(--font-mono)', opacity: isActive ? 1 : 0.8 }}
                            >
                                DAY {d.day}
                            </span>
                            <span
                                className="text-2xl font-bold leading-none mt-0.5"
                                style={{ fontFamily: 'var(--font-heading)', color: isActive ? '#fff' : '#ffffff' }}
                            >
                                {d.date.split("-")[2]}
                            </span>
                            <span
                                className="text-[10px] mt-0.5 tracking-wide whitespace-nowrap"
                                style={{ fontFamily: 'var(--font-mono)', opacity: isActive ? 1 : 0.6 }}
                            >
                                {d.summary || d.title.substring(0, 4)}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
