import { BookOpen, Lightbulb } from "lucide-react";
import checklistData from "../data/checklist.json";

export default function InfoPage() {
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
                        旅遊資訊
                    </span>
                </div>
                <h1
                    className="text-[32px] font-bold leading-none tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)', color: '#ffffff' }}
                >
                    Travel Tips
                </h1>
                <p
                    className="text-sm mt-2"
                    style={{ color: '#6a9bcc', fontFamily: 'var(--font-mono)' }}
                >
                    越南旅遊須知 · 行前必讀
                </p>
            </header>

            <div className="px-5 py-5 flex-1 pb-6">
                {/* Tips Section Header */}
                <div className="flex items-center gap-2.5 mb-4">
                    <span
                        className="text-[11px] font-bold"
                        style={{ color: 'var(--color-warning)', fontFamily: 'var(--font-mono)' }}
                    >
                        須知
                    </span>
                    <div style={{ color: 'var(--color-warning)' }}>
                        <Lightbulb size={15} strokeWidth={2.5} />
                    </div>
                    <h2
                        className="text-[16px] font-bold"
                        style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                    >
                        旅遊須知
                    </h2>
                </div>

                <div className="space-y-3">
                    {checklistData.tips.map((tip, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl p-5 relative overflow-hidden"
                            style={{
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                            }}
                        >
                            <div
                                className="absolute top-0 left-0 w-[3px] h-full"
                                style={{ background: 'var(--color-accent)' }}
                            />
                            <h3
                                className="font-bold mb-2 text-[15px]"
                                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                            >
                                {tip.section}
                            </h3>
                            <p
                                className="text-[13px] leading-relaxed whitespace-pre-line"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                {tip.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Info credit */}
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
