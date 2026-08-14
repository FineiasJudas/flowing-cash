"use client";

import { motion } from "framer-motion";

type Props = { className?: string };

const PURPLE = "#5B21B6";
const TEAL = "#14B8A6";

// Cordilheira de picos + faixa de barras estilo "preço/volume" (comum em
// gráficos de bolsa) para dar mais densidade de dados ao fundo do hero.
// As barras sobem primeiro (staggered, tipo "a carregar dados"),
// depois a linha de picos desenha-se por cima.
export function HeroFlowMountainsPV({ className = "" }: Props) {
  const barVariants = {
    hidden: { scaleY: 0 },
    visible: (i: number) => ({
      scaleY: 1,
      transition: { delay: i * 0.012, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <svg
      viewBox="0 0 680 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mountainsPvFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.22" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* faixa de barras (estilo volume) */}
      <g opacity={0.85}>
        <motion.rect x="10" y="212" width="6" height="34" rx="2" fill="#5B21B6" style={{ transformOrigin: "13px 246px" }} custom={0} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="26" y="223" width="6" height="23" rx="2" fill="#5B21B6" style={{ transformOrigin: "29px 246px" }} custom={1} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="42" y="191" width="6" height="55" rx="2" fill="#14B8A6" style={{ transformOrigin: "45px 246px" }} custom={2} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="58" y="195" width="6" height="51" rx="2" fill="#14B8A6" style={{ transformOrigin: "61px 246px" }} custom={3} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="74" y="198" width="6" height="48" rx="2" fill="#5B21B6" style={{ transformOrigin: "77px 246px" }} custom={4} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="90" y="209" width="6" height="37" rx="2" fill="#5B21B6" style={{ transformOrigin: "93px 246px" }} custom={5} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="106" y="213" width="6" height="33" rx="2" fill="#5B21B6" style={{ transformOrigin: "109px 246px" }} custom={6} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="122" y="215" width="6" height="31" rx="2" fill="#5B21B6" style={{ transformOrigin: "125px 246px" }} custom={7} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="138" y="172" width="6" height="74" rx="2" fill="#14B8A6" style={{ transformOrigin: "141px 246px" }} custom={8} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="154" y="222" width="6" height="24" rx="2" fill="#5B21B6" style={{ transformOrigin: "157px 246px" }} custom={9} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="170" y="223" width="6" height="23" rx="2" fill="#5B21B6" style={{ transformOrigin: "173px 246px" }} custom={10} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="186" y="215" width="6" height="31" rx="2" fill="#5B21B6" style={{ transformOrigin: "189px 246px" }} custom={11} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="202" y="199" width="6" height="47" rx="2" fill="#5B21B6" style={{ transformOrigin: "205px 246px" }} custom={12} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="218" y="197" width="6" height="49" rx="2" fill="#5B21B6" style={{ transformOrigin: "221px 246px" }} custom={13} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="234" y="162" width="6" height="84" rx="2" fill="#14B8A6" style={{ transformOrigin: "237px 246px" }} custom={14} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="250" y="223" width="6" height="23" rx="2" fill="#5B21B6" style={{ transformOrigin: "253px 246px" }} custom={15} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="266" y="201" width="6" height="45" rx="2" fill="#5B21B6" style={{ transformOrigin: "269px 246px" }} custom={16} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="282" y="173" width="6" height="73" rx="2" fill="#14B8A6" style={{ transformOrigin: "285px 246px" }} custom={17} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="298" y="198" width="6" height="48" rx="2" fill="#5B21B6" style={{ transformOrigin: "301px 246px" }} custom={18} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="314" y="169" width="6" height="77" rx="2" fill="#14B8A6" style={{ transformOrigin: "317px 246px" }} custom={19} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="330" y="191" width="6" height="55" rx="2" fill="#14B8A6" style={{ transformOrigin: "333px 246px" }} custom={20} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="346" y="226" width="6" height="20" rx="2" fill="#5B21B6" style={{ transformOrigin: "349px 246px" }} custom={21} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="362" y="206" width="6" height="40" rx="2" fill="#5B21B6" style={{ transformOrigin: "365px 246px" }} custom={22} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="378" y="172" width="6" height="74" rx="2" fill="#14B8A6" style={{ transformOrigin: "381px 246px" }} custom={23} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="394" y="183" width="6" height="63" rx="2" fill="#14B8A6" style={{ transformOrigin: "397px 246px" }} custom={24} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="410" y="191" width="6" height="55" rx="2" fill="#14B8A6" style={{ transformOrigin: "413px 246px" }} custom={25} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="426" y="207" width="6" height="39" rx="2" fill="#5B21B6" style={{ transformOrigin: "429px 246px" }} custom={26} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="442" y="199" width="6" height="47" rx="2" fill="#5B21B6" style={{ transformOrigin: "445px 246px" }} custom={27} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="458" y="183" width="6" height="63" rx="2" fill="#14B8A6" style={{ transformOrigin: "461px 246px" }} custom={28} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="474" y="213" width="6" height="33" rx="2" fill="#5B21B6" style={{ transformOrigin: "477px 246px" }} custom={29} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="490" y="215" width="6" height="31" rx="2" fill="#5B21B6" style={{ transformOrigin: "493px 246px" }} custom={30} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="506" y="178" width="6" height="68" rx="2" fill="#14B8A6" style={{ transformOrigin: "509px 246px" }} custom={31} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="522" y="214" width="6" height="32" rx="2" fill="#5B21B6" style={{ transformOrigin: "525px 246px" }} custom={32} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="538" y="181" width="6" height="65" rx="2" fill="#14B8A6" style={{ transformOrigin: "541px 246px" }} custom={33} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="554" y="182" width="6" height="64" rx="2" fill="#14B8A6" style={{ transformOrigin: "557px 246px" }} custom={34} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="570" y="193" width="6" height="53" rx="2" fill="#14B8A6" style={{ transformOrigin: "573px 246px" }} custom={35} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="586" y="221" width="6" height="25" rx="2" fill="#5B21B6" style={{ transformOrigin: "589px 246px" }} custom={36} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="602" y="168" width="6" height="78" rx="2" fill="#14B8A6" style={{ transformOrigin: "605px 246px" }} custom={37} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="618" y="211" width="6" height="35" rx="2" fill="#5B21B6" style={{ transformOrigin: "621px 246px" }} custom={38} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="634" y="178" width="6" height="68" rx="2" fill="#14B8A6" style={{ transformOrigin: "637px 246px" }} custom={39} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="650" y="216" width="6" height="30" rx="2" fill="#5B21B6" style={{ transformOrigin: "653px 246px" }} custom={40} variants={barVariants} initial="hidden" animate="visible" />
        <motion.rect x="666" y="189" width="6" height="57" rx="2" fill="#14B8A6" style={{ transformOrigin: "669px 246px" }} custom={41} variants={barVariants} initial="hidden" animate="visible" />
      </g>

      {/* área preenchida sob a linha de picos */}
      <motion.path
        d="M0 190 L80 100 L150 160 L230 60 L310 150 L400 40 L490 130 L580 90 L680 150 L680 260 L0 260 Z"
        fill="url(#mountainsPvFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
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
        transition={{ delay: 0.6, duration: 1.4, ease: "easeInOut" }}
      />
      <motion.circle
        cx="400"
        cy="40"
        r="8"
        fill={TEAL}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

// Uso: <HeroFlowMountainsPV className="absolute inset-x-0 bottom-0 w-full" />
