"use client";

import { motion } from "framer-motion";

type HeroFlowCurveProps = {
  className?: string;
};

const BRAND_PURPLE = "#5B21B6";
const BRAND_TEAL = "#14B8A6";

// Curva orgânica "fluxo contínuo" para composição de página (hero, secções
// de destaque). Não usar como logo - ver FlowingCashLogo.tsx para isso.
export function HeroFlowCurve({ className = "" }: HeroFlowCurveProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M10 140 Q 100 40, 190 110 Q 280 180, 370 60"
        stroke={BRAND_PURPLE}
        strokeWidth={6}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      <motion.circle
        cx="370"
        cy="60"
        r="8"
        fill={BRAND_TEAL}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

// Uso no hero, ex:
// <HeroFlowCurve className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px]" />
