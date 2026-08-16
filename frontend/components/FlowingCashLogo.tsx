type FlowingCashLogoProps = {
  className?: string;
  iconOnly?: boolean;
};

// Cores fixas de marca (não usam CSS variables de tema, mantêm-se
// consistentes em light e dark mode - só o texto muda).
const BRAND_PURPLE = "#5B21B6";
const BRAND_TEAL = "#14B8A6";

export function FlowingCashLogo({ className = "", iconOnly = false }: FlowingCashLogoProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <svg
        width="26"
        height="30"
        viewBox="4 -3 87 99"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="4" y="65" width="16" height="30" rx="3" fill={BRAND_PURPLE} />
        <rect x="26" y="48" width="16" height="47" rx="3" fill={BRAND_PURPLE} />
        <rect x="48" y="26" width="16" height="69" rx="3" fill={BRAND_TEAL} />
        <path
          d="M64 26L88 2M88 2V14M88 2H76"
          stroke={BRAND_TEAL}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {!iconOnly && (
        <span className="mt-2 text-[24px] md:text-[28px] font-semibold tracking-tight text-gray-700 leading-none">
          Flowing
          <span className="text-[#431880]">Cash</span>
        </span>
      )}
    </div>
  );
}
























