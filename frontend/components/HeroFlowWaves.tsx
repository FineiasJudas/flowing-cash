"use client";

import { motion } from "framer-motion";

type Props = { className?: string };

const PURPLE = "#5B21B6";
const TEAL = "#14B8A6";

// Opção 2: ondas oceânicas em camadas - tom mais suave/premium (Stripe/Wise-like).
export function HeroFlowWaves({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 680 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wavesFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0.2" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d="M0 160 Q 90 110, 180 160 Q 270 210, 360 160 Q 450 110, 540 160 Q 610 195, 680 160 L680 230 L0 230 Z"
        fill="url(#wavesFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      />
      <motion.path
        d="M0 160 Q 90 110, 180 160 Q 270 210, 360 160 Q 450 110, 540 160 Q 610 195, 680 160"
        stroke={TEAL}
        strokeWidth={3}
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 0.6, duration: 1 }}
      />
      <motion.path
        d="M0 110 Q 100 40, 200 100 Q 300 160, 400 80 Q 500 10, 680 90"
        stroke={PURPLE}
        strokeWidth={6}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      <motion.circle
        cx="400"
        cy="80"
        r="7"
        fill={TEAL}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.4, ease: "easeOut" }}
      />
      <motion.circle
        cx="680"
        cy="90"
        r="9"
        fill={TEAL}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

// Uso: <HeroFlowWaves className="absolute inset-x-0 bottom-0 w-full" />
