import clsx from "clsx";
import { Plane, PlaneLanding, PlaneTakeoff, Footprints, Banknote, Car, Hotel, MapPin, Tickets, Theater, Droplets, Coffee, Ship, Briefcase, Utensils, ShoppingBag, Camera, Gift, Landmark, TreeDeciduous, Waves, ShoppingCart, TramFront, Train, FerrisWheel, Bus, Flower, Mountain, Sun, Map } from "lucide-react";

const ICONS = {
    Plane, PlaneTakeoff, PlaneArrival: PlaneLanding, Footprints, Banknote, Car, Hotel, MapPin, Tickets, Theater, Droplets, Coffee, Ship, Briefcase, Utensils, ShoppingBag, Camera, Gift, Landmark, TreeDeciduous, Waves, ShoppingCart, TramFront, Train, FerrisWheel, Bus, Flower, Mountain, Sun, Map
};

interface TimelineCardProps {
    item: any;
    onClick: () => void;
}

function getIcon(name: string) {
    const Icon = (ICONS as any)[name] || MapPin;
    return <Icon size={16} strokeWidth={2} />;
}

export default function TimelineCard({ item, onClick }: TimelineCardProps) {
    const isTransit = item.type === "transit";
    const hasDetails = item.details && typeof item.details === 'object' && item.details.story;

    const handleMapClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (item.google_map) {
            window.open(item.google_map, "_blank");
        }
    };

    return (
        <div className="flex flex-col">
            {/* Transport Note — shown ABOVE the card (how you got here) */}
            {item.transport && (
                <div
                    className="flex items-center gap-1.5 pl-[57px] pt-2 pb-1"
                >
                    <div
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                        style={{
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                        }}
                    >
                        <div style={{ color: 'var(--color-text-secondary)' }}>
                            {(() => {
                                const Icon = (ICONS as any)[item.transport.icon] || MapPin;
                                return <Icon size={10} strokeWidth={2} />;
                            })()}
                        </div>
                        <span
                            className="text-[10px] font-semibold whitespace-nowrap"
                            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}
                        >
                            {item.transport.text}
                        </span>
                    </div>
                </div>
            )}

            <div className="flex gap-3 relative">
                {/* Time column */}
                <div className="flex flex-col items-end pt-3 w-[44px] flex-shrink-0">
                    <span
                        className="text-[11px] font-bold tracking-tight"
                        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}
                    >
                        {item.time}
                    </span>
                </div>

                {/* Timeline dot and line */}
                <div className="flex flex-col items-center pt-3.5 flex-shrink-0 relative">
                    <div
                        className="w-[8px] h-[8px] rounded-full flex-shrink-0 z-10"
                        style={{
                            background: isTransit ? 'var(--color-border-strong)' : 'var(--color-accent)',
                            border: isTransit ? 'none' : '2px solid var(--color-accent)',
                            outline: isTransit ? 'none' : '3px solid var(--color-accent-dim)',
                        }}
                    />
                    <div
                        className="w-[1px] flex-1 mt-1"
                        style={{
                            background: isTransit
                                ? 'repeating-linear-gradient(to bottom, var(--color-border) 0, var(--color-border) 4px, transparent 4px, transparent 8px)'
                                : 'var(--color-border)',
                            minHeight: '40px',
                        }}
                    />
                </div>

                {/* Card body */}
                <div
                    onClick={hasDetails ? onClick : undefined}
                    className={clsx(
                        "flex-1 pb-4 mt-1.5",
                        hasDetails ? "cursor-pointer" : ""
                    )}
                >
                    {isTransit ? (
                        /* Transit row - minimal */
                        <div
                            className="flex items-start gap-2.5 py-2.5 px-3.5 rounded-lg transition-colors active:bg-black/[0.02]"
                            style={{
                                background: 'transparent',
                                border: '1px dashed var(--color-border)',
                            }}
                        >
                            <div className="mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                                {getIcon(item.icon)}
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span
                                    className="text-[12px] font-semibold truncate"
                                    style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                                >
                                    {item.title}
                                </span>
                                {item.description && (
                                    <span
                                        className="text-[11px] mt-0.5"
                                        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
                                    >
                                        {item.description}
                                    </span>
                                )}
                            </div>
                            {item.google_map && (
                                <button
                                    onClick={handleMapClick}
                                    className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-md flex items-center justify-center transition-colors hover:bg-black/5"
                                    style={{
                                        background: 'var(--color-bg)',
                                        border: '1px solid var(--color-border)',
                                        color: 'var(--color-text-secondary)',
                                    }}
                                    title="打開 Google Maps"
                                    aria-label="打開 Google Maps"
                                >
                                    <Map size={12} />
                                </button>
                            )}
                        </div>
                    ) : (
                        /* Regular event card */
                        <div
                            className="rounded-xl overflow-hidden transition-all duration-200 active:scale-[0.98]"
                            style={{
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                            }}
                        >
                            {/* Image Header */}
                            {item.image && (
                                <div className="w-full h-32 overflow-hidden relative bg-gray-100">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover shrink-0" 
                                        loading="lazy"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).parentElement?.classList.add('hidden');
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                            )}

                            <div className="p-3.5">
                                <div className="flex items-start justify-between gap-2 mb-1.5">
                                    <div className="flex items-start gap-2.5">
                                        <div
                                            className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-white mt-0.5"
                                            style={{ background: 'var(--color-accent)' }}
                                        >
                                            {getIcon(item.icon)}
                                        </div>
                                        <h3
                                            className="text-[15px] font-bold leading-tight"
                                            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                                        >
                                            {item.title}
                                        </h3>
                                    </div>
                                    {item.google_map && (
                                        <button
                                            onClick={handleMapClick}
                                            className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-colors"
                                            style={{
                                                background: 'var(--color-bg)',
                                                border: '1px solid var(--color-border)',
                                                color: 'var(--color-text-secondary)',
                                            }}
                                            title="打開 Google Maps"
                                        >
                                            <Map size={14} />
                                        </button>
                                    )}
                                </div>

                                <p
                                    className="text-[13px] leading-relaxed pl-[37px]"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    {item.description}
                                </p>

                                {hasDetails && (
                                    <div className="mt-2.5 pl-[37px]">
                                        <span
                                            className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm"
                                            style={{
                                                color: 'var(--color-accent)',
                                                background: 'var(--color-accent-dim)',
                                                fontFamily: 'var(--font-mono)',
                                            }}
                                        >
                                            點我看詳細 →
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
