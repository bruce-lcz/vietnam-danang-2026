import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 max-w-md mx-auto"
                        style={{ background: 'rgba(18,18,18,0.6)', backdropFilter: 'blur(4px)' }}
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 220 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_e, info) => {
                            if (info.offset.y > 100 || info.velocity.y > 500) {
                                onClose();
                            }
                        }}
                        className="fixed bottom-0 left-[50%] -translate-x-1/2 w-full max-w-md z-50 overflow-hidden flex flex-col max-h-[90vh]"
                        style={{
                            background: 'var(--color-surface)',
                            borderRadius: '20px 20px 0 0',
                            borderTop: '1px solid var(--color-border)',
                        }}
                    >
                        {/* Drag Handle */}
                        <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
                            <div
                                className="w-10 h-1"
                                style={{ background: 'var(--color-border-strong)', borderRadius: '999px' }}
                            />
                        </div>

                        {/* Header */}
                        {title && (
                            <div
                                className="flex justify-between items-center px-6 py-3.5"
                                style={{ borderBottom: '1px solid var(--color-border)' }}
                            >
                                <h2
                                    className="text-[18px] font-bold"
                                    style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                                >
                                    {title}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-md transition-colors"
                                    style={{
                                        background: 'var(--color-bg)',
                                        border: '1px solid var(--color-border)',
                                        color: 'var(--color-text-muted)',
                                    }}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        )}

                        {/* Accent bar */}
                        <div className="h-[2px] w-full" style={{ background: 'var(--color-accent)' }} />

                        {/* Content */}
                        <div className="overflow-y-auto overflow-x-hidden pb-8 px-6 pt-4 flex-1">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
