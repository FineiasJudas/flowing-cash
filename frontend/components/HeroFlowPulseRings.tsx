"use client";

import { motion } from "framer-motion";

type Props = { className?: string };

const PURPLE = "#5B21B6";
const TEAL = "#14B8A6";

// Opção 4: anéis de pulso - mais abstrato, sugere "impacto"/"sinal".
// Boa para uma composição de fundo mais centrada e menos literal.
export function HeroFlowPulseRings({ className = "" }: Props) {
  const ringVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: [0.15, 0.45 - i * 0.1][0] || 0.15,
      transition: { delay: i * 0.25, duration: 0.7, ease: "easeOut" },
    }),
  };

  return (
    <svg
      viewBox="0 0 680 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <motion.circle
        cx="500"
        cy="110"
        r="140"
        stroke={PURPLE}
        strokeWidth={2}
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        style={{ transformOrigin: "500px 110px" }}
      />
      <motion.circle
        cx="500"
        cy="110"
        r="100"
        stroke={PURPLE}
        strokeWidth={3}
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.28 }}
        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        style={{ transformOrigin: "500px 110px" }}
      />
      <motion.circle
        cx="500"
        cy="110"
        r="60"
        stroke={PURPLE}
        strokeWidth={4}
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.45 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        style={{ transformOrigin: "500px 110px" }}
      />
      <motion.circle
        cx="500"
        cy="110"
        r="22"
        fill={TEAL}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0, duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "500px 110px" }}
      />
      <motion.path
        d="M40 160 Q 200 40, 360 110 Q 440 150, 500 110"
        stroke={PURPLE}
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

// Uso: <HeroFlowPulseRings className="absolute inset-x-0 bottom-0 w-full" />
