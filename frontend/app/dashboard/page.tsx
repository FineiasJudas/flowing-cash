'use client'

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import OverviewChart, { OverviewChartPoint } from '@/components/OverviewChart';
import { apiFetch } from '@/services/api';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";

type DashboardSummary = {
  period: { month: number; year: number };
  summary: {
    balance: number;
    totalIncome: number;
    totalExpense: number;
    transactionsCount: number;
  };
  categoryExpenses: { name: string; amount: number; color: string }[];
  recentTransactions: {
    id: string;
    description: string;
    amount: string | number;
    type: 'INCOME' | 'EXPENSE';
    date: string;
    category: { name: string; color: string | null };
  }[];
};

function formatKz(value: number) {
  return value.toLocaleString('pt-AO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function DashboardGeral() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [chartData, setChartData] = useState<OverviewChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError('');
      try {
        const [summaryData, overviewData] = await Promise.all([
          apiFetch<DashboardSummary>('/dashboard/summary'),
          apiFetch<OverviewChartPoint[]>('/dashboard/monthly-overview?months=6'),
        ]);
        setSummary(summaryData);
        setChartData(overviewData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar o dashboard.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full flex items-center justify-center py-24 text-gray-400"
      >
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        A carregar dashboard...
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-6">
        {error}
      </div>
    );
  }

  const balance = summary?.summary.balance ?? 0;
  const totalIncome = summary?.summary.totalIncome ?? 0;
  const totalExpense = summary?.summary.totalExpense ?? 0;

  return (
    <div
      className="w-full flex flex-col gap-8"
    >
      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Saldo */}
        <div
          
          className="bg-gray-800 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between min-h-[140px]"
        >
          <div>
            <p className="text-xs font-medium text-purple-200 uppercase tracking-wider">Saldo do Mês</p>
            <h3 className="text-2xl md:text-3xl font-extrabold mt-1">{formatKz(balance)} <span className="text-sm font-normal">Kz</span></h3>
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-medium mt-4 ${balance >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
            {balance >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{summary?.summary.transactionsCount ?? 0} transações este mês</span>
          </div>
        </div>

        {/* Card Receitas */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[140px]"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Receitas do Mês</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatKz(totalIncome)} <span className="text-sm text-gray-500 font-normal">Kz</span></h3>
            </div>
            <div
              
              className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"
            >
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        {/* Card Despesas */}
        <div
         
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[140px]"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Despesas do Mês</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatKz(totalExpense)} <span className="text-sm text-gray-500 font-normal">Kz</span></h3>
            </div>
            <div
              className="w-10 h-10 rounded-xl bg-purple-50 text-[#431880] flex items-center justify-center"
            >
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* GRÁFICO */}
      <motion.div variants={cardVariants} className="w-full">
        <OverviewChart data={chartData} />
      </motion.div>

      {/* TRANSAÇÕES RECENTES */}
      <div
       
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Transações Recentes</h3>
        </div>
        <div
          className="divide-y divide-gray-100"
        >
          {summary && summary.recentTransactions.length > 0 ? (
            summary.recentTransactions.map((t) => (
              <div
                key={t.id}
                whileHover={{ backgroundColor: "rgba(67, 24, 128, 0.03)" }}
                className="flex items-center justify-between px-6 py-3.5 text-sm"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{t.description}</span>
                  <span className="text-xs text-gray-400">{t.category?.name} · {new Date(t.date).toLocaleDateString('pt-AO')}</span>
                </div>
                <span className={`font-bold ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {t.type === 'INCOME' ? '+' : '-'}{formatKz(Number(t.amount))} Kz
                </span>
              </div>
            ))
          ) : (
            <p className="px-6 py-8 text-center text-sm text-gray-400">Ainda não há transações registadas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
