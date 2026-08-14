'use client'

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from "next/navigation";
import Modal from '@/components/modals/Modal';
import { 
  LayoutDashboard, 
  Receipt, 
  PiggyBank, 
  Settings, 
  LogOut, 
  FlowingCashLogo // Substitui pelo teu componente real
} from "lucide-react";

type User = { name: string; email: string; }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try { setUser(JSON.parse(userData)); } catch (e) { console.error(e); }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = "token=; path=/; max-age=0";
    setTimeout(() => { router.push('/login'); }, 400);
  };

  const menuItems = [
    { label: "Geral", path: "/dashboard", icon: LayoutDashboard },
    { label: "Despesas", path: "/dashboard/xpends", icon: Receipt },
    { label: "Economias", path: "/dashboard/economics", icon: PiggyBank },
    { label: "Definições", path: "/dashboard/configs", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-screen bg-gray-50/50 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col justify-between p-4 shrink-0 hidden md:flex">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-8 h-8 rounded-lg bg-[#431880] flex items-center justify-center text-white font-bold">F</div>
            <span className="font-bold text-lg text-gray-800 tracking-tight">FlowingCash</span>
          </div>

          {/* Navegação */}
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                    isActive 
                      ? "bg-[#431880] text-white shadow-md shadow-[#431880]/15" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Botão Sair da Sidebar */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-red-600 hover:bg-red-50 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Terminar Sessão
        </button>
      </aside>

      {/* ÁREA DE CONTEÚDO DIREITA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOPBAR */}
        <header className="w-full bg-white flex flex-row justify-between items-center px-6 py-4 border-b border-gray-200 shadow-sm shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Olá, <span className="text-[#431880]">{user?.name || 'Utilizador'}</span> 👋
            </h1>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 p-1.5 px-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#431880] text-white flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 z-50 text-sm">
                <button
                  onClick={() => { setIsMenuOpen(false); router.push('/dashboard/configs'); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 flex items-center gap-2.5 font-medium"
                >
                  Definições
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); setShowLogoutModal(true); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 font-medium flex items-center gap-2.5 border-t border-gray-100"
                >
                  Terminar sessão
                </button>
              </div>
            )}
          </div>
        </header>

        {/* CONTEÚDO DINÂMICO (INJETADO AQUI) */}
        <main className="flex-1 overflow-y-auto p-6 focus:outline-none">
          {children}
        </main>
      </div>

      {/* Modal de Logout Global */}
      <Modal open={showLogoutModal} closeOnBackdrop onBackdropClick={() => setShowLogoutModal(false)}>
        <div className="flex flex-col gap-4 p-2">
          <h2 className="text-lg font-bold text-gray-900">Terminar sessão?</h2>
          <p className="text-sm text-gray-600">Desejas realmente sair do FlowingCash?</p>
          <div className="flex gap-3 mt-2">
            <button onClick={() => setShowLogoutModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50">Cancelar</button>
            <button onClick={handleLogout} disabled={isLoggingOut} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700">{isLoggingOut ? 'A sair...' : 'Sim, Terminar'}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
