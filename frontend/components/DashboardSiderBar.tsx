'use client'

import Link from "next/link";
import Image from "next/image";
import { DashboardFlowingCashLogo } from "@/components/DashboardFlowingCashLogo"
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard as DashboardIcon, 
  ArrowDownCircle, 
  PiggyBank, 
  Settings, 
  HelpCircle 
} from "lucide-react";

const sidebarItems = [
  { id: 1, name: "geral", link: '/dashboard', label: "Geral", icon: DashboardIcon },
  { id: 2, name: "Despesas", link: '/dashboard/xpends', label: "Despesas", icon: ArrowDownCircle },
  { id: 3, name: "Economias", link: '/dashboard/economics', label: "Economias", icon: PiggyBank },
  { id: 4, name: "Configuracoes", link: '/dashboard/configs', label: "Configurações", icon: Settings },
  { id: 5, name: "Ajuda", link: '/dashboard/help', label: "Ajuda", icon: HelpCircle }
];

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <aside className="w-16 md:w-64 h-screen sticky top-0 flex flex-col bg-[#1e293b] text-slate-300 border-r border-slate-700 shadow-lg z-40 transition-all duration-300">
      {/* Logo */}
      <Link 
        href="" 
        className="flex items-center justify-center md:justify-start gap-3 px-4 py-5 text-xl font-bold text-white border-b border-slate-700/60"
      >
        <DashboardFlowingCashLogo className="hidden md:flex justify-center text-slate-200"/>
        <span className="inline  md:hidden font-bold tracking-tight">
          <DashboardFlowingCashLogo iconOnly={true} className="justify-center"/>
        </span>
      </Link>

      {/* Links de Navegação */}
      <nav className="flex-1 flex flex-col gap-1 p-3 mt-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.link;

          return (
            <Link
              key={item.id}
              href={item.link}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 justify-center md:justify-start ${
                isActive
                  ? "bg-[#431880] text-white shadow-md"
                  : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
