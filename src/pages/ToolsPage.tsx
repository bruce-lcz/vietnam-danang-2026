import { useState, useEffect, useCallback, useRef } from "react";
import { Volume2, VolumeX, ArrowRightLeft, MessageSquare, Pencil } from "lucide-react";
import exchangeConfig from "../data/exchange-config.json";
import phrases from "../data/vietnamese-phrases.json";

const RATE_STORAGE_KEY = "vnd_twd_rate";

// Group phrases by category
const categories = Array.from(new Set(phrases.map((p) => p.category)));
const groupedPhrases = categories.map((cat) => ({
    category: cat,
    items: phrases.filter((p) => p.category === cat),
}));

// Format number with commas
function formatNum(n: number): string {
    return n.toLocaleString("zh-TW");
}

function playVietnameseAudio(phraseId: string) {
    const audio = new Audio(`./audio/vietnamese/${phraseId}.mp3`);
    audio.play().catch(err => console.error("Error playing audio:", err));
}

// VND amount card
interface AmountCardProps {
    vnd: number;
    rate: number;
}
function AmountCard({ vnd, rate }: AmountCardProps) {
    const twd = rate > 0 ? vnd / rate : 0;
    const twdDisplay = twd < 1 ? twd.toFixed(2) : Math.round(twd).toLocaleString("zh-TW");

    return (
        <div
            className="rounded-xl p-4 flex flex-col gap-1 transition-all duration-200 active:scale-[0.97]"
            style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
            }}
        >
            <span
                className="text-[11px] font-bold"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
            >
                🇻🇳 VND
            </span>
            <span
                className="text-[18px] font-bold leading-tight"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
            >
                {formatNum(vnd)}
            </span>
            <div className="flex items-center gap-1 mt-1">
                <span style={{ color: 'var(--color-accent)', fontSize: 10 }}>≈</span>
                <span
                    className="text-[15px] font-bold"
                    style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}
                >
                    {twdDisplay}
                </span>
                <span
                    className="text-[11px]"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                    TWD
                </span>
            </div>
        </div>
    );
}

// Custom VND input card
interface CustomAmountCardProps {
    rate: number;
}
function CustomAmountCard({ rate }: CustomAmountCardProps) {
    const [vndInput, setVndInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const vndValue = parseFloat(vndInput.replace(/,/g, "")) || 0;
    const twd = rate > 0 && vndValue > 0 ? vndValue / rate : null;
    const twdDisplay = twd !== null
        ? (twd < 1 ? twd.toFixed(2) : Math.round(twd).toLocaleString("zh-TW"))
        : null;

    return (
        <div
            className="rounded-xl p-4 flex flex-col gap-1 col-span-2 transition-all duration-200 cursor-text"
            style={{
                background: 'var(--color-surface)',
                border: '1.5px dashed var(--color-border-strong)',
            }}
            onClick={() => inputRef.current?.focus()}
        >
            <div className="flex items-center gap-1.5">
                <span
                    className="text-[11px] font-bold"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                    🇻🇳 自訂金額
                </span>
                <Pencil size={10} style={{ color: 'var(--color-text-muted)' }} />
            </div>
            <input
                ref={inputRef}
                type="number"
                value={vndInput}
                onChange={(e) => setVndInput(e.target.value)}
                placeholder="輸入 VND 金額…"
                className="text-[18px] font-bold bg-transparent outline-none w-full"
                style={{
                    color: vndValue > 0 ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    fontFamily: 'var(--font-heading)',
                    border: 'none',
                }}
                min="0"
            />
            <div className="flex items-center gap-1 mt-1 h-5">
                {twdDisplay !== null ? (
                    <>
                        <span style={{ color: 'var(--color-accent)', fontSize: 10 }}>≈</span>
                        <span
                            className="text-[15px] font-bold"
                            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}
                        >
                            {twdDisplay}
                        </span>
                        <span
                            className="text-[11px]"
                            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                        >
                            TWD
                        </span>
                    </>
                ) : (
                    <span
                        className="text-[12px]"
                        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                    >
                        結果將顯示於此
                    </span>
                )}
            </div>
        </div>
    );
}

// Vietnamese phrase card
interface PhraseCardProps {
    id: string;
    vietnamese: string;
    chinese: string;
    phonetic: string;
}
function PhraseCard({ id, vietnamese, chinese, phonetic }: PhraseCardProps) {
    const [speaking, setSpeaking] = useState(false);

    const handleSpeak = useCallback(() => {
        setSpeaking(true);
        playVietnameseAudio(id);
        setTimeout(() => setSpeaking(false), 1500);
    }, [id]);

    return (
        <div
            className="rounded-xl px-4 py-3 flex items-center justify-between gap-3 relative overflow-hidden"
            style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
            }}
        >
            <div
                className="absolute top-0 left-0 w-[3px] h-full"
                style={{ background: 'var(--color-positive)' }}
            />
            <div className="flex-1 min-w-0 pl-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                    <span
                        className="text-[16px] font-bold"
                        style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                    >
                        {vietnamese}
                    </span>
                    <span
                        className="text-[12px]"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {chinese}
                    </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                    <span
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                    >
                        空耳
                    </span>
                    <span
                        className="text-[13px] font-medium"
                        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                    >
                        {phonetic}
                    </span>
                </div>
            </div>

            <button
                onClick={handleSpeak}
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
                style={{
                    background: speaking ? 'var(--color-positive)' : 'var(--color-positive-bg)',
                    color: speaking ? '#ffffff' : 'var(--color-positive)',
                }}
                aria-label={`播放 ${vietnamese}`}
            >
                {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
        </div>
    );
}

export default function ToolsPage() {
    const [rate, setRate] = useState<number>(exchangeConfig.defaultRate);
    const [rateInput, setRateInput] = useState<string>(String(exchangeConfig.defaultRate));

    useEffect(() => {
        // Load saved rate
        const saved = localStorage.getItem(RATE_STORAGE_KEY);
        if (saved) {
            const parsed = parseFloat(saved);
            if (!isNaN(parsed) && parsed > 0) {
                setRate(parsed);
                setRateInput(String(parsed));
            }
        }
    }, []);

    const handleRateChange = (val: string) => {
        setRateInput(val);
        const parsed = parseFloat(val);
        if (!isNaN(parsed) && parsed > 0) {
            setRate(parsed);
            localStorage.setItem(RATE_STORAGE_KEY, String(parsed));
        }
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
                        旅遊工具
                    </span>
                </div>
                <h1
                    className="text-[32px] font-bold leading-none tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)', color: '#ffffff' }}
                >
                    Tools
                </h1>
                <p
                    className="text-sm mt-2"
                    style={{ color: '#6a9bcc', fontFamily: 'var(--font-mono)' }}
                >
                    換匯計算 · 常用越南語
                </p>
            </header>

            <div className="px-5 py-5 flex-1 space-y-7 pb-24">

                {/* ── Section 1: Currency Exchange ── */}
                <section>
                    <div className="flex items-center gap-2.5 mb-4">
                        <span
                            className="text-[11px] font-bold"
                            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                        >
                            01
                        </span>
                        <div style={{ color: 'var(--color-accent)' }}>
                            <ArrowRightLeft size={15} strokeWidth={2.5} />
                        </div>
                        <h2
                            className="text-[16px] font-bold"
                            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                        >
                            快速換匯
                        </h2>
                    </div>

                    {/* Rate input */}
                    <div
                        className="rounded-xl p-4 mb-4 flex items-center gap-3"
                        style={{
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                        }}
                    >
                        <span
                            className="text-[13px] font-medium whitespace-nowrap"
                            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}
                        >
                            1 TWD =
                        </span>
                        <input
                            type="number"
                            value={rateInput}
                            onChange={(e) => handleRateChange(e.target.value)}
                            className="flex-1 text-[18px] font-bold text-right bg-transparent outline-none"
                            style={{
                                color: 'var(--color-text-primary)',
                                fontFamily: 'var(--font-heading)',
                                border: 'none',
                                minWidth: 0,
                            }}
                            placeholder="825"
                            min="1"
                        />
                        <span
                            className="text-[13px] font-bold whitespace-nowrap"
                            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                        >
                            VND
                        </span>
                    </div>

                    <p
                        className="text-[11px] mb-3 text-right"
                        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                    >
                        ※ 匯率存於本機，可隨時修改
                    </p>

                    {/* Amount grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {exchangeConfig.amounts.map((vnd) => (
                            <AmountCard key={vnd} vnd={vnd} rate={rate} />
                        ))}
                        {/* 500,000 is the 5th (odd), so it takes left cell; custom card spans full width */}
                        <CustomAmountCard rate={rate} />
                    </div>
                </section>

                {/* ── Section 2: Vietnamese Phrases ── */}
                <section>
                    <div className="flex items-center gap-2.5 mb-1">
                        <span
                            className="text-[11px] font-bold"
                            style={{ color: 'var(--color-positive)', fontFamily: 'var(--font-mono)' }}
                        >
                            02
                        </span>
                        <div style={{ color: 'var(--color-positive)' }}>
                            <MessageSquare size={15} strokeWidth={2.5} />
                        </div>
                        <h2
                            className="text-[16px] font-bold"
                            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                        >
                            常用越南語
                        </h2>
                        <span
                            className="text-[10px] ml-auto"
                            style={{ color: 'var(--color-positive)', fontFamily: 'var(--font-mono)' }}
                        >
                            🔊 點卡片播放
                        </span>
                    </div>
                    <p
                        className="text-[11px] mb-4"
                        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                    >
                        空耳標注以中文對應發音，僅供參考
                    </p>

                    <div className="space-y-5">
                        {groupedPhrases.map(({ category, items }) => (
                            <div key={category}>
                                <h3
                                    className="text-[12px] font-bold uppercase tracking-wider mb-2 px-1"
                                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                                >
                                    {category}
                                </h3>
                                <div className="space-y-2">
                                    {items.map((phrase) => (
                                        <PhraseCard
                                            key={phrase.id}
                                            {...phrase}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
