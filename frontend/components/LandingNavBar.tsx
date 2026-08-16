'use client'

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FlowingCashLogo } from "@/components/FlowingCashLogo";

const NavBarItens = [
  { id: "1", href: "#inicio", label: "Início" },
  { id: "2", href: "#sobre", label: "Sobre" },
  { id: "3", href: "#como-funciona", label: "Como funciona" },
  { id: "4", href: "#servicos", label: "Serviços" },
];

export default function LandingNavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky z-50 top-0 border-b border-gray-200/80 shadow-sm transition-all">
      <motion.div 
        	initial={{ opacity: 0, y: 15 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  viewport={{ once: true }}
		  transition={{ duration: 0.5 }}
      
       className="w-full flex flex-row justify-between max-w-6xl mx-auto items-center px-4 py-4">
        
        {/* Logo */}
        <FlowingCashLogo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-row items-center gap-8">
          {NavBarItens.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-base font-medium text-gray-700 hover:text-[#431880] transition-colors relative group py-1"
            >
              {item.label}
             
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex flex-row items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full bg-white text-gray-800 text-sm font-medium border border-gray-300 hover:bg-gray-100 shadow-sm transition-all duration-200 hover:scale-105"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-full bg-[#431880] text-white text-sm font-medium border border-[#431880] hover:bg-[#341266] shadow-md shadow-[#431880]/20 transition-all duration-200 hover:scale-105"
          >
            Registrar
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          aria-label="Toggle menu"
          className="flex md:hidden p-2 text-gray-700 hover:text-[#431880] focus:outline-none transition-colors"
        >
          {openMenu ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </motion.div>

      {/* Mobile Menu Dropdown com Framer Motion */}
      <AnimatePresence>
        {openMenu && (
          <motion.nav 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex md:hidden flex-col bg-white border-t border-gray-100 px-6 py-4 gap-4 shadow-xl overflow-hidden"
          >
            {NavBarItens.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpenMenu(false)}
                className="text font-medium text-gray-800 hover:text-[#431880] py-1 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
              <Link
                href="/login"
                onClick={() => setOpenMenu(false)}
                className="w-full text-center px-5 py-2.5 rounded-full bg-white text-gray-800 text-sm font-medium border border-gray-300 hover:bg-gray-100 active:scale-98 transition-all"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                onClick={() => setOpenMenu(false)}
                className="w-full text-center px-5 py-2.5 rounded-full bg-[#431880] text-white text-sm font-medium hover:bg-[#341266] active:scale-98 transition-all"
              >
                Registrar
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
