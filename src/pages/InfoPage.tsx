import { useMemo, useState } from "react";
import {
    BookOpen,
    CloudRain,
    CloudSun,
    Lightbulb,
    Mountain,
    SunMedium,
} from "lucide-react";
import checklistData from "../data/checklist.json";
import weatherOutfits, {
    weatherOutfitOverview,
    weatherSources,
} from "../data/weatherOutfits";

type LiveWeatherLocation = {
    key: "da-nang" | "hoi-an";
    name: string;
    latitude: number;
    longitude: number;
};

type OpenMeteoResponse = {
    daily?: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        precipitation_probability_max: number[];
    };
};

type LiveWeatherForecastDay = {
    date: string;
    weatherCode: number;
    tempMax: number;
    tempMin: number;
    precipitationProbability: number;
};

type LiveWeatherCard = {
    location: LiveWeatherLocation;
    daily: LiveWeatherForecastDay[];
};

const tripDates = weatherOutfits.map((card) => card.tripDate);

const liveWeatherLocations: LiveWeatherLocation[] = [
    {
        key: "da-nang",
        name: "峴港",
        latitude: 16.0544,
        longitude: 108.2022,
    },
    {
        key: "hoi-an",
        name: "會安",
        latitude: 15.8801,
        longitude: 108.338,
    },
];

const weatherCodeLabelMap: Record<number, string> = {
    0: "晴朗",
    1: "大致晴",
    2: "局部多雲",
    3: "陰天",
    45: "起霧",
    48: "霧凇",
    51: "毛毛雨",
    53: "短暫細雨",
    55: "持續細雨",
    61: "小雨",
    63: "中雨",
    65: "大雨",
    80: "陣雨",
    81: "陣雨偏強",
    82: "強陣雨",
    95: "雷雨",
    96: "雷雨伴冰粒",
    99: "強雷雨",
};

const getWeatherLabel = (code: number) => weatherCodeLabelMap[code] ?? "天氣變化中";

const formatForecastDate = (date: string) =>
    new Intl.DateTimeFormat("zh-TW", {
        month: "numeric",
        day: "numeric",
        timeZone: "Asia/Bangkok",
    }).format(new Date(`${date}T12:00:00+07:00`));

const getLiveWeatherUrl = ({ latitude, longitude }: LiveWeatherLocation) => {
    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        timezone: "Asia/Bangkok",
        forecast_days: "10",
    });

    return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
};

const parseLiveWeather = (location: LiveWeatherLocation, data: OpenMeteoResponse): LiveWeatherCard => {
    if (!data.daily) {
        throw new Error("Weather data is incomplete");
    }

    return {
        location,
        daily: data.daily.time.map((date, index) => ({
            date,
            weatherCode: data.daily?.weather_code[index] ?? 0,
            tempMax: data.daily?.temperature_2m_max[index] ?? 0,
            tempMin: data.daily?.temperature_2m_min[index] ?? 0,
            precipitationProbability: data.daily?.precipitation_probability_max[index] ?? 0,
        })),
    };
};

const renderInlineFormattedText = (text: string) =>
    text.split(/\*\*(.*?)\*\*/g).map((part, index) => {
        if (index % 2 === 1) {
            return (
                <span
                    key={`${part}-${index}`}
                    className="font-bold px-1.5 py-0.5 rounded-md mx-[2px]"
                    style={{
                        backgroundColor: "var(--color-accent-dim)",
                        color: "var(--color-accent)",
                    }}
                >
                    {part}
                </span>
            );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
    });

const renderFormattedText = (text: string) =>
    text.split("\n").map((line, index) => {
        const trimmedLine = line.trim();
        const isBullet = trimmedLine.startsWith("•");
        const content = isBullet ? trimmedLine.replace(/^•\s*/, "") : trimmedLine;

        if (!content) {
            return null;
        }

        if (isBullet) {
            return (
                <div key={`line-${index}`} className="flex items-start gap-2.5 mb-2 last:mb-0">
                    <span
                        className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ background: "var(--color-accent)" }}
                    />
                    <p className="text-[13px] leading-relaxed">{renderInlineFormattedText(content)}</p>
                </div>
            );
        }

        return (
            <p key={`line-${index}`} className="mb-2 text-[13px] leading-relaxed last:mb-0">
                {renderInlineFormattedText(content)}
            </p>
        );
    });

const weatherCardStyles = {
    sunny: {
        icon: SunMedium,
        iconColor: "#d97757",
        chipBg: "#fff3e8",
        glow: "linear-gradient(135deg, rgba(217,119,87,0.18), rgba(255,255,255,0.95))",
    },
    mixed: {
        icon: CloudSun,
        iconColor: "#6a9bcc",
        chipBg: "#edf5ff",
        glow: "linear-gradient(135deg, rgba(106,155,204,0.18), rgba(255,255,255,0.95))",
    },
    rainy: {
        icon: CloudRain,
        iconColor: "#5478a2",
        chipBg: "#eaf2fb",
        glow: "linear-gradient(135deg, rgba(84,120,162,0.2), rgba(255,255,255,0.95))",
    },
    mountain: {
        icon: Mountain,
        iconColor: "#788c5d",
        chipBg: "#eef5f0",
        glow: "linear-gradient(135deg, rgba(120,140,93,0.2), rgba(255,255,255,0.95))",
    },
} as const;

const infoCardStyles = [
    {
        accent: "#d97757",
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(253,240,240,0.82))",
        badgeBg: "#fff1eb",
    },
    {
        accent: "#6a9bcc",
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(237,245,255,0.86))",
        badgeBg: "#edf5ff",
    },
    {
        accent: "#788c5d",
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(238,245,240,0.86))",
        badgeBg: "#eef5f0",
    },
    {
        accent: "#8c6d5d",
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(253,248,236,0.92))",
        badgeBg: "#fdf8ec",
    },
] as const;

const getTipDisplay = (section: string) => {
    const match = section.match(/^(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*/u);

    return {
        emoji: match?.[1] ?? "•",
        title: section.replace(/^(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*/u, ""),
    };
};

export default function InfoPage() {
    const [liveWeather, setLiveWeather] = useState<LiveWeatherCard[]>([]);
    const [weatherStatus, setWeatherStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

    const travelTips = checklistData.tips.filter((tip) => !tip.section.includes("衣著"));
    const liveWeatherByLocation = useMemo(
        () => Object.fromEntries(liveWeather.map((card) => [card.location.key, card])) as Record<string, LiveWeatherCard>,
        [liveWeather],
    );
    const coverageSummary = useMemo(
        () =>
            liveWeatherLocations.map((location) => {
                const days = liveWeatherByLocation[location.key]?.daily ?? [];
                const coveredTripDays = days.filter((day) => tripDates.includes(day.date));
                const lastAvailableDay = days.at(-1)?.date;

                return {
                    key: location.key,
                    name: location.name,
                    coveredTripDays,
                    lastAvailableDay,
                };
            }),
        [liveWeatherByLocation],
    );
    const handleRefreshWeather = async () => {
        try {
            setWeatherStatus("loading");

            const responses = await Promise.all(
                liveWeatherLocations.map(async (location) => {
                    const response = await fetch(getLiveWeatherUrl(location));

                    if (!response.ok) {
                        throw new Error(`Failed to fetch weather for ${location.name}`);
                    }

                    const data = (await response.json()) as OpenMeteoResponse;
                    return parseLiveWeather(location, data);
                }),
            );

            setLiveWeather(responses);
            setWeatherStatus("ready");
        } catch {
            setWeatherStatus("error");
        }
    };

    return (
        <div className="relative min-h-full flex flex-col" style={{ background: 'var(--color-bg)' }}>
            <header
                className="pt-10 px-6 pb-6"
                style={{ background: "var(--color-text-primary)" }}
            >
                <div className="mb-3">
                    <span
                        className="text-[10px] font-bold uppercase tracking-[0.15em]"
                        style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                    >
                        旅遊資訊
                    </span>
                </div>
                <h1
                    className="text-[32px] font-bold leading-none tracking-tight"
                    style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
                >
                    出發前須知
                </h1>
                <p
                    className="text-sm mt-2"
                    style={{ color: "#6a9bcc", fontFamily: "var(--font-mono)" }}
                >
                    越南旅遊須知 · 行前必讀
                </p>
            </header>

            <div className="px-5 py-5 flex-1 pb-6">
                <section className="mb-6">
                    <div
                        className="rounded-xl p-4"
                        style={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <div className="flex flex-wrap gap-2">
                            {weatherOutfitOverview.essentials.map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold"
                                    style={{
                                        background: "var(--color-bg)",
                                        color: "var(--color-text-secondary)",
                                        border: "1px solid var(--color-border)",
                                        fontFamily: "var(--font-mono)",
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mb-6">
                    <h2
                        className="mb-4 text-[18px] font-bold"
                        style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}
                    >
                        每日穿搭建議
                    </h2>

                    <div
                        className="rounded-2xl p-4 mb-4"
                        style={{
                            background: "linear-gradient(135deg, #141413 0%, #24384f 100%)",
                            color: "#ffffff",
                        }}
                    >
                        <p
                            className="text-[14px] leading-relaxed"
                            style={{ color: "#f7f2ec" }}
                        >
                            {weatherOutfitOverview.summary}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {weatherOutfitOverview.essentials.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full px-3 py-1 text-[11px] font-semibold"
                                    style={{
                                        background: "rgba(255,255,255,0.12)",
                                        color: "#ffffff",
                                        fontFamily: "var(--font-mono)",
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="flex flex-wrap gap-2">
                                {coverageSummary
                                    .filter((item) => weatherStatus === "ready" && item.lastAvailableDay)
                                    .map((item) => (
                                        <span
                                            key={item.key}
                                            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                                            style={{
                                                background: "rgba(255,255,255,0.12)",
                                                color: "#ffffff",
                                                fontFamily: "var(--font-mono)",
                                            }}
                                        >
                                            {item.name} · {formatForecastDate(item.lastAvailableDay!)}
                                        </span>
                                    ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    void handleRefreshWeather();
                                }}
                                disabled={weatherStatus === "loading"}
                                className="shrink-0 rounded-full px-3 py-2 text-[11px] font-semibold transition-all hover:translate-y-[-1px] disabled:opacity-60"
                                style={{
                                    background: "#fff3e8",
                                    color: "#24384f",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                {weatherStatus === "loading" ? "更新中..." : "更新天氣資訊"}
                            </button>
                        </div>

                        {weatherStatus === "error" && (
                            <p className="mt-3 text-[12px] leading-relaxed" style={{ color: "#f7f2ec" }}>
                                天氣更新失敗，請稍後再試。
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-1 px-1 snap-x snap-mandatory">
                        {weatherOutfits.map((card) => {
                            const cardStyle = weatherCardStyles[card.vibe];
                            const Icon = cardStyle.icon;
                            const liveForecasts = card.liveLocationKeys
                                .map((key) => {
                                    const locationCard = liveWeatherByLocation[key];
                                    const day = locationCard?.daily.find((item) => item.date === card.tripDate);

                                    if (!locationCard || !day) {
                                        return null;
                                    }

                                    return {
                                        locationName: locationCard.location.name,
                                        day,
                                    };
                                })
                                .filter((item): item is NonNullable<typeof item> => item !== null);

                            return (
                                <article
                                    key={card.day}
                                    className="min-w-[280px] max-w-[280px] rounded-3xl p-4 shrink-0 border snap-start"
                                    style={{
                                        background: `linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.72)), ${cardStyle.glow}`,
                                        borderColor: "var(--color-border)",
                                        boxShadow: "0 16px 40px rgba(20,20,19,0.08)",
                                    }}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p
                                                className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                                                style={{
                                                    color: cardStyle.iconColor,
                                                    background: cardStyle.chipBg,
                                                    fontFamily: "var(--font-mono)",
                                                }}
                                            >
                                                第 {card.day} 天 · {card.weekday}
                                            </p>
                                            <h3
                                                className="mt-1 text-[18px] font-bold"
                                                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                                            >
                                                {card.date}
                                            </h3>
                                            <p
                                                className="mt-1 text-[12px] leading-relaxed"
                                                style={{ color: 'var(--color-text-secondary)' }}
                                            >
                                                {card.area}
                                            </p>
                                        </div>

                                        <div
                                            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                                            style={{ background: cardStyle.chipBg, color: cardStyle.iconColor }}
                                        >
                                            <Icon size={22} strokeWidth={2.2} />
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                                        <div
                                            className="rounded-2xl p-3"
                                            style={{ background: "rgba(255,255,255,0.72)" }}
                                        >
                                            <p
                                                className="text-[13px] font-semibold leading-snug"
                                                style={{ color: 'var(--color-text-primary)' }}
                                            >
                                                {card.condition}
                                            </p>
                                        </div>
                                        <div
                                            className="rounded-2xl p-3"
                                            style={{ background: "rgba(255,255,255,0.72)" }}
                                        >
                                            <p
                                                className="text-[13px] font-semibold leading-snug"
                                                style={{ color: 'var(--color-text-primary)' }}
                                            >
                                                {card.temperature}
                                            </p>
                                            <p
                                                className="mt-1 text-[11px]"
                                                style={{ color: 'var(--color-text-secondary)' }}
                                            >
                                                {card.rain}
                                            </p>
                                            {liveForecasts.length > 0 && (
                                                <div className="mt-2 space-y-1">
                                                    {liveForecasts.map((forecast) => (
                                                        <p
                                                            key={`${card.tripDate}-${forecast.locationName}`}
                                                            className="text-[10px] leading-relaxed"
                                                            style={{ color: "var(--color-text-secondary)" }}
                                                        >
                                                            近期預報 {forecast.locationName} {Math.round(forecast.day.tempMin)}-
                                                            {Math.round(forecast.day.tempMax)}°C · {getWeatherLabel(
                                                                forecast.day.weatherCode,
                                                            )} · 降雨 {Math.round(
                                                                forecast.day.precipitationProbability,
                                                            )}
                                                            %
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        className="mt-3 rounded-[24px] p-4"
                                        style={{ background: "rgba(255,255,255,0.82)" }}
                                    >
                                        <p
                                            className="text-[13px] leading-relaxed"
                                            style={{ color: 'var(--color-text-primary)' }}
                                        >
                                            {card.outfit}
                                        </p>
                                        <p
                                            className="mt-2 text-[12px] leading-relaxed"
                                            style={{ color: 'var(--color-text-secondary)' }}
                                        >
                                            {card.note}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                </section>

                <section className="mb-2">
                    <div className="mb-4 flex items-center gap-2">
                        <div style={{ color: "var(--color-warning)" }}>
                            <Lightbulb size={14} strokeWidth={2.5} />
                        </div>
                        <h2
                            className="text-[18px] font-bold"
                            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}
                        >
                            旅遊須知
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {travelTips.map((tip, idx) => {
                            const cardStyle = infoCardStyles[idx % infoCardStyles.length];
                            const display = getTipDisplay(tip.section);

                            return (
                                <article
                                    key={idx}
                                    className="relative overflow-hidden rounded-[28px] border p-5"
                                    style={{
                                        background: cardStyle.background,
                                        borderColor: "rgba(232,230,220,0.95)",
                                        boxShadow: "0 14px 34px rgba(20,20,19,0.05)",
                                    }}
                                >
                                    <div
                                        className="absolute left-0 top-0 h-full w-1.5"
                                        style={{ background: cardStyle.accent }}
                                    />
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[20px]"
                                            style={{ background: cardStyle.badgeBg }}
                                        >
                                            {display.emoji}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3
                                                className="text-[18px] font-bold leading-tight"
                                                style={{
                                                    color: "var(--color-text-primary)",
                                                    fontFamily: "var(--font-heading)",
                                                }}
                                            >
                                                {display.title}
                                            </h3>
                                            <div
                                                className="mt-3 rounded-[22px] p-4"
                                                style={{ background: "rgba(255,255,255,0.70)", color: "var(--color-text-secondary)" }}
                                            >
                                                {renderFormattedText(tip.content)}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                    {weatherSources.map((source) => (
                        <a
                            key={source.url}
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] underline underline-offset-2"
                            style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}
                        >
                            {source.label}
                        </a>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <BookOpen size={12} style={{ color: 'var(--color-text-muted)' }} />
                        <p
                            className="text-[11px]"
                            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                        >
                            資訊僅供參考，以當地實際情況為準
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
