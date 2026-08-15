"use client";

import { motion, Variants } from "framer-motion";

type Props = { className?: string };

const PURPLE = "#5B21B6";
const TEAL = "#14B8A6";
const INK = "#1F1233";

// Versão mais detalhada: grelha de fundo, candlesticks com pavios,
// linha de picos, média móvel tracejada e um cartão de valor no pico.
// Sequência: grelha -> candlesticks (staggered) -> área + linha de picos
// -> média móvel -> cartão de valor.
export function HeroFlowMountainsDetailed({ className = "" }: Props) {
  const candleVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: (i: number) => ({
      scaleY: 1,
      transition: { delay: 0.3 + i * 0.012, duration: 0.35, ease: "easeOut" },
    }),
  };

  return (
    <svg
      viewBox="0 0 680 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mountainsDetailFill" x1="0" y1="0" x2="0" y2="1">
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

      {/* candlesticks com pavios */}
      <g opacity={0.85}>
        <motion.g key={0} custom={0} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "13px 246px" }}>
          <line x1="13" y1="206" x2="13" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="10" y="212" width="6" height="34" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={1} custom={1} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "29px 246px" }}>
          <line x1="29" y1="182" x2="29" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="26" y="191" width="6" height="55" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={2} custom={2} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "45px 246px" }}>
          <line x1="45" y1="190" x2="45" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="42" y="198" width="6" height="48" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={3} custom={3} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "61px 246px" }}>
          <line x1="61" y1="197" x2="61" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="58" y="213" width="6" height="33" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={4} custom={4} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "77px 246px" }}>
          <line x1="77" y1="200" x2="77" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="74" y="215" width="6" height="31" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={5} custom={5} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "93px 246px" }}>
          <line x1="93" y1="166" x2="93" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="90" y="172" width="6" height="74" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={6} custom={6} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "109px 246px" }}>
          <line x1="109" y1="216" x2="109" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="106" y="223" width="6" height="23" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={7} custom={7} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "125px 246px" }}>
          <line x1="125" y1="190" x2="125" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="122" y="199" width="6" height="47" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={8} custom={8} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "141px 246px" }}>
          <line x1="141" y1="147" x2="141" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="138" y="162" width="6" height="84" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={9} custom={9} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "157px 246px" }}>
          <line x1="157" y1="209" x2="157" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="154" y="223" width="6" height="23" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={10} custom={10} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "173px 246px" }}>
          <line x1="173" y1="185" x2="173" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="170" y="201" width="6" height="45" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={11} custom={11} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "189px 246px" }}>
          <line x1="189" y1="164" x2="189" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="186" y="173" width="6" height="73" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={12} custom={12} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "205px 246px" }}>
          <line x1="205" y1="154" x2="205" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="202" y="169" width="6" height="77" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={13} custom={13} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "221px 246px" }}>
          <line x1="221" y1="185" x2="221" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="218" y="191" width="6" height="55" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={14} custom={14} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "237px 246px" }}>
          <line x1="237" y1="194" x2="237" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="234" y="206" width="6" height="40" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={15} custom={15} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "253px 246px" }}>
          <line x1="253" y1="173" x2="253" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="250" y="183" width="6" height="63" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={16} custom={16} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "269px 246px" }}>
          <line x1="269" y1="198" x2="269" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="266" y="207" width="6" height="39" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={17} custom={17} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "285px 246px" }}>
          <line x1="285" y1="176" x2="285" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="282" y="183" width="6" height="63" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={18} custom={18} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "301px 246px" }}>
          <line x1="301" y1="203" x2="301" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="298" y="215" width="6" height="31" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={19} custom={19} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "317px 246px" }}>
          <line x1="317" y1="203" x2="317" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="314" y="214" width="6" height="32" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={20} custom={20} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "333px 246px" }}>
          <line x1="333" y1="167" x2="333" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="330" y="182" width="6" height="64" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={21} custom={21} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "349px 246px" }}>
          <line x1="349" y1="187" x2="349" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="346" y="193" width="6" height="53" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={22} custom={22} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "365px 246px" }}>
          <line x1="365" y1="154" x2="365" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="362" y="168" width="6" height="78" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={23} custom={23} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "381px 246px" }}>
          <line x1="381" y1="199" x2="381" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="378" y="211" width="6" height="35" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={24} custom={24} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "397px 246px" }}>
          <line x1="397" y1="202" x2="397" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="394" y="216" width="6" height="30" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={25} custom={25} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "413px 246px" }}>
          <line x1="413" y1="173" x2="413" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="410" y="189" width="6" height="57" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={26} custom={26} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "429px 246px" }}>
          <line x1="429" y1="165" x2="429" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="426" y="180" width="6" height="66" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={27} custom={27} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "445px 246px" }}>
          <line x1="445" y1="195" x2="445" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="442" y="202" width="6" height="44" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={28} custom={28} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "461px 246px" }}>
          <line x1="461" y1="205" x2="461" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="458" y="221" width="6" height="25" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={29} custom={29} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "477px 246px" }}>
          <line x1="477" y1="187" x2="477" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="474" y="197" width="6" height="49" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={30} custom={30} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "493px 246px" }}>
          <line x1="493" y1="207" x2="493" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="490" y="216" width="6" height="30" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={31} custom={31} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "509px 246px" }}>
          <line x1="509" y1="202" x2="509" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="506" y="214" width="6" height="32" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={32} custom={32} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "525px 246px" }}>
          <line x1="525" y1="178" x2="525" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="522" y="191" width="6" height="55" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={33} custom={33} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "541px 246px" }}>
          <line x1="541" y1="172" x2="541" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="538" y="180" width="6" height="66" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={34} custom={34} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "557px 246px" }}>
          <line x1="557" y1="168" x2="557" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="554" y="179" width="6" height="67" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={35} custom={35} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "573px 246px" }}>
          <line x1="573" y1="184" x2="573" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="570" y="200" width="6" height="46" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={36} custom={36} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "589px 246px" }}>
          <line x1="589" y1="176" x2="589" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="586" y="192" width="6" height="54" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={37} custom={37} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "605px 246px" }}>
          <line x1="605" y1="202" x2="605" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="602" y="217" width="6" height="29" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={38} custom={38} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "621px 246px" }}>
          <line x1="621" y1="191" x2="621" y2="246" stroke="#5B21B6" strokeWidth={1} />
          <rect x="618" y="205" width="6" height="41" rx="1" fill="#5B21B6" />
        </motion.g>
        <motion.g key={39} custom={39} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "637px 246px" }}>
          <line x1="637" y1="187" x2="637" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="634" y="195" width="6" height="51" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={40} custom={40} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "653px 246px" }}>
          <line x1="653" y1="155" x2="653" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="650" y="167" width="6" height="79" rx="1" fill="#14B8A6" />
        </motion.g>
        <motion.g key={41} custom={41} variants={candleVariants} initial="hidden" animate="visible" style={{ transformOrigin: "669px 246px" }}>
          <line x1="669" y1="176" x2="669" y2="246" stroke="#14B8A6" strokeWidth={1} />
          <rect x="666" y="192" width="6" height="54" rx="1" fill="#14B8A6" />
        </motion.g>
      </g>

      {/* área preenchida sob a linha de picos */}
      <motion.path
        d="M0 190 L80 100 L150 160 L230 60 L310 150 L400 40 L490 130 L580 90 L680 150 L680 300 L0 300 Z"
        fill="url(#mountainsDetailFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
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
        transition={{ delay: 0.9, duration: 1.2, ease: "easeInOut" }}
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
        transition={{ delay: 1.6, duration: 1, ease: "easeInOut" }}
      />

      {/* ponto de destaque + cartão de valor */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.4, ease: "easeOut" }}
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

// Uso: <HeroFlowMountainsDetailed className="absolute inset-x-0 bottom-0 w-full" />
