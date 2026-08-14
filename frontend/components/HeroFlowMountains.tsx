"use client";

import { motion } from "framer-motion";

type Props = { className?: string };

const PURPLE = "#5B21B6";
const TEAL = "#14B8A6";

// Opção 1: cordilheira de picos - leitura imediata de "gráfico de mercado".
export function HeroFlowMountains({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 680 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mountainsFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.22" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d="M0 190 L80 100 L150 160 L230 60 L310 150 L400 40 L490 130 L580 90 L680 150 L680 220 L0 220 Z"
        fill="url(#mountainsFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
      <motion.path
        d="M0 190 L80 100 L150 160 L230 60 L310 150 L400 40 L490 130 L580 90 L680 150"
        stroke={PURPLE}
        strokeWidth={5}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <motion.circle
        cx="400"
        cy="40"
        r="8"
        fill={TEAL}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

// Uso: <HeroFlowMountains className="absolute inset-x-0 bottom-0 w-full" />
