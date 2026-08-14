"use client";

import { motion } from "framer-motion";

type Props = { className?: string };

const PURPLE = "#5B21B6";
const TEAL = "#14B8A6";
const INK = "#1F1233";

// Mesma composição detalhada, mas sem a faixa de candlesticks - mais
// limpa, mantendo grelha, linha de picos, média móvel tracejada e o
// cartão de valor no pico.
export function HeroFlowMountainsDetailedNoPV({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 680 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mountainsDetailNoPvFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.22" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* grelha de fundo */}
      <motion.g
        stroke="#D8CFF0"
        strokeWidth={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <line x1="0" y1="40" x2="680" y2="40" />
        <line x1="0" y1="90" x2="680" y2="90" />
        <line x1="0" y1="140" x2="680" y2="140" />
        <line x1="0" y1="190" x2="680" y2="190" />
        <line x1="0" y1="240" x2="680" y2="240" />
      </motion.g>

      {/* área preenchida sob a linha de picos */}
      <motion.path
        d="M0 190 L80 100 L150 160 L230 60 L310 150 L400 40 L490 130 L580 90 L680 150 L680 300 L0 300 Z"
        fill="url(#mountainsDetailNoPvFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      />
      {/* linha de picos */}
      <motion.path
        d="M0 190 L80 100 L150 160 L230 60 L310 150 L400 40 L490 130 L580 90 L680 150"
        stroke={PURPLE}
        strokeWidth={5}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 1.4, ease: "easeInOut" }}
      />

      {/* média móvel tracejada */}
      <motion.path
        d="M0 175 Q 150 140, 230 100 Q 310 130, 400 90 Q 490 110, 580 100 Q 630 95, 680 100"
        stroke={TEAL}
        strokeWidth={2}
        strokeDasharray="6 5"
        fill="none"
        opacity={0.75}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
      />

      {/* ponto de destaque + cartão de valor */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.4, ease: "easeOut" }}
      >
        <circle cx="400" cy="40" r="8" fill={TEAL} />
        <line x1="400" y1="40" x2="400" y2="20" stroke={TEAL} strokeWidth={1.5} opacity={0.6} />
        <rect x="345" y="0" width="110" height="26" rx="6" fill={INK} />
        <text x="400" y="17" textAnchor="middle" fontSize="13" fontWeight={600} fill="#FFFFFF" fontFamily="sans-serif">
          +248.500 Kz
        </text>
      </motion.g>
    </svg>
  );
}

// Uso: <HeroFlowMountainsDetailedNoPV className="absolute inset-x-0 bottom-0 w-full" />
