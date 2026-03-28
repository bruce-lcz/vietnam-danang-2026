import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface ChecklistItemProps {
    id: string;
    title: string;
    defaultStatus: boolean;
}

export default function ChecklistSection({ id, title, defaultStatus }: ChecklistItemProps) {
    const [isChecked, setIsChecked] = useState(defaultStatus);

    useEffect(() => {
        const savedStatus = localStorage.getItem(`checklist_${id}`);
        if (savedStatus !== null) {
            setIsChecked(JSON.parse(savedStatus));
        }
    }, [id]);

    const toggleCheck = () => {
        const nextStatus = !isChecked;
        setIsChecked(nextStatus);
        localStorage.setItem(`checklist_${id}`, JSON.stringify(nextStatus));
    };

    return (
        <div
            onClick={toggleCheck}
            className="flex items-center justify-between py-3 px-1 cursor-pointer active:scale-[0.98] transition-all duration-200"
            style={{ borderBottom: '1px solid var(--color-border)' }}
        >
            <span
                className="text-[14px] font-medium transition-colors flex-1 mr-3"
                style={{
                    color: isChecked ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                    textDecoration: isChecked ? 'line-through' : 'none',
                    fontFamily: 'var(--font-body)',
                }}
            >
                {title}
            </span>

            <div
                className="w-5 h-5 rounded-sm flex items-center justify-center transition-all duration-200 flex-shrink-0"
                style={{
                    background: isChecked ? 'var(--color-accent)' : 'transparent',
                    border: isChecked ? 'none' : '1.5px solid var(--color-border-strong)',
                }}
            >
                {isChecked && <Check size={12} className="text-white" strokeWidth={3} />}
            </div>
        </div>
    );
}
