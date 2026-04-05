import { useState } from "react";
import data from "../data/itinerary";
import DaySelector from "../components/itinerary/DaySelector";
import TimelineCard from "../components/itinerary/TimelineCard";
import BottomSheet from "../components/common/BottomSheet";
import { Map, Info, Lightbulb, Ticket, Utensils, Plane, Bookmark } from "lucide-react";

const DETAIL_CONFIG: Record<string, { label: string, icon: any, color: string }> = {
    story: { label: "Story & Guide", icon: Info, color: "var(--color-accent)" },
    tips: { label: "旅遊提醒", icon: Lightbulb, color: "#eab308" },
    tickets: { label: "Ticket Info", icon: Ticket, color: "#10b981" },
    dining: { label: "Must Try / Menu", icon: Utensils, color: "#f97316" },
    flight: { label: "Flight Details", icon: Plane, color: "#3b82f6" },
    booking: { label: "Booking Info", icon: Bookmark, color: "#8b5cf6" },
};
import VietnamFlag from "../components/common/VietnamFlag";

export default function ItineraryPage() {
    const [selectedDay, setSelectedDay] = useState(1);
    const [activeItem, setActiveItem] = useState<any>(null);

    const currentDayData = data.find((d) => d.day === selectedDay);

    const handleOpenSheet = (item: any) => {
        setActiveItem(item);
    };

    const dayInfoList = data.map((d) => ({
        day: d.day,
        date: d.date,
        title: d.title,
        summary: (d as any).summary,
    }));

    return (
        <div className="relative flex flex-col" style={{ background: 'var(--color-bg)' }}>
            {/* Header */}
            <header
                className="pt-10 px-6 pb-6"
                style={{ background: '#141413' }}
            >
                <div className="mb-3">
                    <span
                        className="text-[10px] font-bold uppercase tracking-[0.15em]"
                        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                    >
                        DA NANG · 2026
                    </span>
                </div>
                <h1
                    className="text-[32px] font-bold leading-none tracking-tight flex items-center"
                    style={{ fontFamily: 'var(--font-heading)', color: '#ffffff' }}
                >
                    <VietnamFlag className="w-8 h-auto mr-3 rounded-sm shadow-sm" /> 峴港之旅
                </h1>
                <p
                    className="text-sm mt-2 font-medium"
                    style={{ color: '#e8e6dc', fontFamily: 'var(--font-mono)' }}
                >
                    APR 17 – 22, 2026 · 6 DAYS
                </p>
            </header>

            {/* Date Scroller */}
            <DaySelector days={dayInfoList} selectedDay={selectedDay} onSelectDay={setSelectedDay} />

            {/* Day Title */}
            <div className="px-5 pt-5 pb-2">
                <div className="flex items-center gap-3">
                    <span
                        className="text-[11px] font-bold"
                        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                    >
                        Day {selectedDay}
                    </span>
                    <h2
                        className="text-xl font-bold"
                        style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                    >
                        {currentDayData?.title}
                    </h2>
                </div>
                <div
                    className="mt-1.5 h-[1px]"
                    style={{ background: 'var(--color-border)' }}
                />
            </div>

            {/* Timeline Section */}
            <div className="px-4 py-4">
                <div className="flex flex-col gap-0">
                    {currentDayData?.timeline.map((item, idx) => (
                        <TimelineCard
                            key={idx}
                            item={item}
                            onClick={() => handleOpenSheet(item)}
                        />
                    ))}
                </div>
            </div>

            {/* Detail Bottom Sheet */}
            <BottomSheet
                isOpen={!!activeItem}
                onClose={() => setActiveItem(null)}
                title={activeItem?.title}
            >
                {activeItem?.image && (
                    <div className="w-full h-48 rounded-xl overflow-hidden mb-6 mt-2 relative shadow-sm">
                        <img 
                            src={activeItem.image.startsWith('http') ? activeItem.image : `${import.meta.env.BASE_URL}${activeItem.image.startsWith('/') ? activeItem.image.slice(1) : activeItem.image}`} 
                            alt={activeItem.title} 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                )}

                <div className="space-y-5">
                    <div className="space-y-4">
                        {activeItem?.details && Object.entries(DETAIL_CONFIG).map(([key, config]) => {
                            const content = activeItem.details[key];
                            if (!content) return null;
                            const Icon = config.icon;
                            return (
                                <div
                                    key={key}
                                    className="rounded-xl p-5 relative overflow-hidden"
                                    style={{
                                        background: 'var(--color-bg)',
                                        border: '1px solid var(--color-border)',
                                    }}
                                >
                                    <div
                                        className="absolute top-0 left-0 w-[3px] h-full"
                                        style={{ background: config.color }}
                                    />
                                    <h3
                                        className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2 flex items-center gap-1.5"
                                        style={{ color: config.color, fontFamily: 'var(--font-mono)' }}
                                    >
                                        <Icon size={14} />
                                        {config.label}
                                    </h3>
                                    <p
                                        className="text-[15px] leading-relaxed"
                                        style={{ color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}
                                    >
                                        {content}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {activeItem?.details?.mapUrl && (
                        <a
                            href={activeItem?.details?.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold transition-opacity hover:opacity-90 active:scale-[0.98]"
                            style={{
                                background: 'var(--color-text-primary)',
                                color: '#fff',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '13px',
                                letterSpacing: '0.05em',
                            }}
                        >
                            <Map size={16} />
                            在 Google 地圖中開啟
                        </a>
                    )}
                </div>
            </BottomSheet>
        </div>
    );
}
