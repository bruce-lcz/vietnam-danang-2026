import { Star, MapPin, Map } from "lucide-react";

interface RestaurantCardProps {
    restaurant: any;
    onClick: () => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
    const handleMapClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (restaurant.mapUrl) {
            window.open(restaurant.mapUrl, "_blank");
        }
    };

    return (
        <div
            onClick={onClick}
            className="overflow-hidden cursor-pointer active:scale-[0.98] transition-transform mb-5 rounded-xl"
            style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}
        >
            {/* Image Cover */}
            <div className="relative h-44 w-full group overflow-hidden">
                <img
                    src={restaurant.image?.startsWith('http') ? restaurant.image : `${import.meta.env.BASE_URL}${restaurant.image?.startsWith('/') ? restaurant.image.slice(1) : restaurant.image || ''}`}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Map Link Button */}
                {restaurant.mapUrl && (
                    <button
                        onClick={handleMapClick}
                        className="absolute top-3 left-3 size-8 flex items-center justify-center transition-all active:scale-90"
                        style={{
                            background: 'rgba(18,18,18,0.6)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: 'rgba(255,255,255,0.9)',
                        }}
                        title="在 Google Maps 中打開"
                    >
                        <Map size={16} />
                    </button>
                )}

                {/* Rating Badge */}
                <div
                    className="absolute top-3 right-3 px-2.5 py-1 flex items-center gap-1"
                    style={{
                        background: 'rgba(18,18,18,0.7)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '6px',
                    }}
                >
                    <Star size={12} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
                    <span
                        className="text-[12px] font-bold text-white"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        {restaurant.rating}
                    </span>
                </div>

                {/* Title area over image */}
                <div className="absolute bottom-3 left-4 right-4">
                    <h3
                        className="text-[18px] font-bold text-white leading-tight mb-0.5"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1 text-white/70">
                        <MapPin size={11} />
                        <span
                            className="text-[11px]"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            {restaurant.location} · {restaurant.reviews} reviews
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {restaurant.tags.map((tag: string, idx: number) => (
                        <span
                            key={idx}
                            className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm"
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
                <p
                    className="text-[13px] line-clamp-2 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    {restaurant.description}
                </p>
            </div>
        </div>
    );
}
