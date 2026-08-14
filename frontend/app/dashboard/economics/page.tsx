'use client'

import { useState } from 'react';
import Modal from '@/components/modals/Modal';
import { 
  PiggyBank, 
  PlusCircle, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  Plane, 
  Car, 
  Building, 
  Sparkles,
  Lock
} from "lucide-react";

// Estrutura do Cofre/Meta
type SavingGoal = {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  category: string;
  deadline: string;
};

// Dados de exemplo
const initialGoals: SavingGoal[] = [
  { 
    id: '1', 
    title: 'Fundo de Emergência', 
    currentAmount: 650000, 
    targetAmount: 1000000, 
    category: 'Segurança', 
    deadline: '2026-12-31' 
  },
  { 
    id: '2', 
    title: 'Viagem de Férias', 
    currentAmount: 280000, 
    targetAmount: 500000, 
    category: 'Lazer', 
    deadline: '2026-11-15' 
  },
  { 
    id: '3', 
    title: 'Troca de Veículo', 
    currentAmount: 400000, 
    targetAmount: 2500000, 
    category: 'Investimento', 
    deadline: '2027-06-30' 
  },
];

export default function EconomicsPage() {
  const [goals, setGoals] = useState<SavingGoal[]>(initialGoals);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados do formulário
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [category, setCategory] = useState('Segurança');
  const [deadline, setDeadline] = useState('');

  // Adicionar novo cofre
  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetAmount) return;

    const newGoal: SavingGoal = {
      id: Date.now().toString(),
      title,
      currentAmount: initialDeposit ? parseFloat(initialDeposit) : 0,
      targetAmount: parseFloat(targetAmount),
      category,
      deadline: deadline || '2026-12-31'
    };

    setGoals([...goals, newGoal]);

    // Resetar campos
    setTitle('');
    setTargetAmount('');
    setInitialDeposit('');
    setCategory('Segurança');
    setDeadline('');
    setIsModalOpen(false);
  };

  // Cálculos globais
  const totalSaved = goals.reduce((acc, curr) => acc + curr.currentAmount, 0);
  const totalTarget = goals.reduce((acc, curr) => acc + curr.targetAmount, 0);
  const globalProgress = totalTarget > 0 ? Math.min(100, Math.round((totalSaved / totalTarget) * 100)) : 0;

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Cofres & Economias</h2>
          <p className="text-xs text-gray-500">Crie metas de poupança, planeie investimentos e acompanhe o seu progresso</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#431880] hover:bg-[#341266] text-white font-semibold text-sm transition-all shadow-md shadow-[#431880]/20 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Criar Novo Cofre</span>
        </button>
      </div>

      {/* CARDS DE RESUMO GLOBAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card Total Economizado */}
        <div className="bg-[#431880] text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between min-h-[140px] relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-xs font-medium text-purple-200 uppercase tracking-wider">Total em Cofres</p>
              <h3 className="text-2xl md:text-3xl font-extrabold mt-1">
                {totalSaved.toLocaleString('pt-AO')} <span className="text-sm font-normal">Kz</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <PiggyBank className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium mt-4 z-10">
            <ArrowUpRight className="w-4 h-4" />
            <span>Alocado em {goals.length} objetivos</span>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Card Meta Global */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Objetivo Global</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {totalTarget.toLocaleString('pt-AO')} <span className="text-sm text-gray-500 font-normal">Kz</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${globalProgress}%` }}
            />
          </div>
        </div>

        {/* Card Dica Inteligente */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800">Crescimento Mensal</h4>
              <p className="text-xs text-gray-500">Média de poupança acelerada</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mt-2">
            Ao manter este ritmo, atingirá o seu <strong className="text-gray-800">Fundo de Emergência</strong> em menos de 4 meses.
          </p>
        </div>

      </div>

      {/* GRID DE COFRES & METAS */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Os Seus Cofres Ativos</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));

            return (
              <div 
                key={goal.id} 
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#431880] flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-800">{goal.title}</h4>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        {goal.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500">Guardado</span>
                    <span className="text-gray-800">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-[#431880] h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span className="font-bold text-gray-900">{goal.currentAmount.toLocaleString('pt-AO')} Kz</span>
                    <span>Meta: {goal.targetAmount.toLocaleString('pt-AO')} Kz</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Prazo: {new Date(goal.deadline).toLocaleDateString('pt-AO')}</span>
                  <button className="text-[#431880] font-bold hover:underline cursor-pointer">
                    + Depositar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL PARA NOVO COFRE */}
      <Modal open={isModalOpen} closeOnBackdrop onBackdropClick={() => setIsModalOpen(false)}>
        <form onSubmit={handleCreateGoal} className="flex flex-col gap-4 p-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Criar Novo Cofre</h3>
            <p className="text-xs text-gray-500">Defina um objetivo financeiro e comece a poupar</p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Nome do Cofre</label>
              <input
                type="text"
                required
                placeholder="Ex: Viagem, Fundo de Maneio, Carro..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#431880]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Meta Pretendida (Kz)</label>
                <input
                  type="number"
                  required
                  placeholder="0.00"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#431880]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Depósito Inicial (Kz)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#431880]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#431880] cursor-pointer"
                >
                  <option value="Segurança">Segurança</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Investimento">Investimento</option>
                  <option value="Bens">Bens Duradouros</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Data Limite</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#431880]"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#431880] hover:bg-[#341266] text-white text-xs font-semibold shadow-md shadow-[#431880]/15"
            >
              Criar Cofre
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
