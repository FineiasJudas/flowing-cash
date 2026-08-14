'use client'

import OverviewChart from '@/components/OverviewChart';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function DashboardGeral() {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Saldo */}
        <div className="bg-[#431880] text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between min-h-[140px]">
          <div>
            <p className="text-xs font-medium text-purple-200 uppercase tracking-wider">Saldo Total</p>
            <h3 className="text-2xl md:text-3xl font-extrabold mt-1">1.250.000,00 <span className="text-sm font-normal">Kz</span></h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium mt-4">
            <ArrowUpRight className="w-4 h-4" />
            <span>+12.5% em relação ao mês anterior</span>
          </div>
        </div>

        {/* Card Receitas */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Receitas do Mês</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">390.000,00 <span className="text-sm text-gray-500 font-normal">Kz</span></h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Card Despesas */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Despesas do Mês</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">220.000,00 <span className="text-sm text-gray-500 font-normal">Kz</span></h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#431880] flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* GRÁFICO */}
      <div className="w-full">
        <OverviewChart />
      </div>
    </div>
  );
}
