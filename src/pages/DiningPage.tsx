import { useState } from "react";
import { Map } from "lucide-react";
import restaurantsData from "../data/restaurants.json";
import RestaurantCard from "../components/dining/RestaurantCard";
import BottomSheet from "../components/common/BottomSheet";

export default function DiningPage() {
    const [activeItem, setActiveItem] = useState<any>(null);

    const handleOpenSheet = (restaurant: any) => {
        setActiveItem(restaurant);
    };

    return (
        <div className="relative min-h-full flex flex-col" style={{ background: 'var(--color-bg)' }}>
            {/* Dark Hero Header */}
            <header
                className="pt-10 px-6 pb-6"
                style={{ background: 'var(--color-text-primary)' }}
            >
                <div className="mb-3">
                    <span
                        className="text-[10px] font-bold uppercase tracking-[0.15em]"
                        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                    >
                        美食指南
                    </span>
                </div>
                <h1
                    className="text-[32px] font-bold leading-none tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)', color: '#ffffff' }}
                >
                    Dining
                </h1>
                <p
                    className="text-sm mt-2"
                    style={{ color: '#6a9bcc', fontFamily: 'var(--font-mono)' }}
                >
                    DA NANG &amp; HOI AN · 20 PICKS
                </p>
            </header>

            {/* List Section */}
            <div className="px-4 py-5 flex-1">
                <div
                    className="text-[11px] font-bold uppercase tracking-widest mb-4 pb-2"
                    style={{
                        color: 'var(--color-accent)',
                        fontFamily: 'var(--font-mono)',
                        borderBottom: '1px solid var(--color-border)',
                    }}
                >
                    精選餐廳 · {restaurantsData.length} RESTAURANTS
                </div>

                {restaurantsData.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onClick={() => handleOpenSheet(restaurant)}
                    />
                ))}
            </div>

            {/* Detail Bottom Sheet */}
            <BottomSheet
                isOpen={!!activeItem}
                onClose={() => setActiveItem(null)}
                title={activeItem?.name}
            >
                <div className="w-full h-52 rounded-xl overflow-hidden mb-5 mt-2 relative">
                    <img src={activeItem?.image} alt={activeItem?.name} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-5">
                    <div
                        className="rounded-xl p-5 relative overflow-hidden"
                        style={{
                            background: 'var(--color-bg)',
                            border: '1px solid var(--color-border)',
                        }}
                    >
                        <div
                            className="absolute top-0 left-0 w-[3px] h-full"
                            style={{ background: 'var(--color-accent)' }}
                        />
                        <h3
                            className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2"
                            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                        >
                            Why We Love It
                        </h3>
                        <p
                            className="text-[15px] leading-relaxed"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {activeItem?.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {activeItem?.tags.map((tag: string, idx: number) => (
                            <span
                                key={idx}
                                className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm"
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    background: 'var(--color-bg)',
                                    border: '1px solid var(--color-border)',
                                    fontFamily: 'var(--font-mono)',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <a
                        href={activeItem?.mapUrl}
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
                        取得路線 (Google Maps)
                    </a>
                </div>
            </BottomSheet>
        </div>
    );
}
