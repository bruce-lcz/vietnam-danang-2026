export default function VietnamFlag({ className = "" }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 900 600"
        >
            <rect width="900" height="600" fill="#da251d" />
            <path
                fill="#ffff00"
                d="M450 120 L486 231 L603 231 L508 300 L545 411 L450 343 L355 411 L392 300 L297 231 L414 231 Z"
            />
        </svg>
    );
}
