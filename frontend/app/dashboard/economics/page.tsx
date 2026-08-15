'use client'

import { useEffect, useState } from 'react';
import Modal from '@/components/modals/Modal';
import { apiFetch } from '@/services/api';
import {
  PiggyBank,
  PlusCircle,
  Target,
  ArrowUpRight,
  Sparkles,
  Lock,
  Loader2,
  Trash2,
} from "lucide-react";

type SavingGoal = {
  id: string;
  title: string;
  currentAmount: string | number;
  targetAmount: string | number;
  category: string;
  deadline: string | null;
};

function formatKz(value: number) {
  return value.toLocaleString('pt-AO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function EconomicsPage() {
  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [depositTarget, setDepositTarget] = useState<SavingGoal | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositSubmitting, setDepositSubmitting] = useState(false);
  const [depositError, setDepositError] = useState('');

  // Estados do formulário
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [category, setCategory] = useState('Segurança');
  const [deadline, setDeadline] = useState('');

  const loadGoals = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch<SavingGoal[]>('/saving-goals');
      setGoals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cofres.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  // Criar novo cofre
  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!title || !targetAmount) return;

    setSubmitting(true);
    try {
      const created = await apiFetch<SavingGoal>('/saving-goals', {
        method: 'POST',
        body: JSON.stringify({
          title,
          category,
          targetAmount: parseFloat(targetAmount),
          currentAmount: initialDeposit ? parseFloat(initialDeposit) : 0,
          deadline: deadline || undefined,
        }),
      });

      setGoals([created, ...goals]);
      setTitle('');
      setTargetAmount('');
      setInitialDeposit('');
      setCategory('Segurança');
      setDeadline('');
      setIsModalOpen(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erro ao criar cofre.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const previous = goals;
    setGoals(goals.filter((g) => g.id !== id));
    try {
      await apiFetch(`/saving-goals/${id}`, { method: 'DELETE' });
    } catch (err) {
      setGoals(previous);
      setError(err instanceof Error ? err.message : 'Erro ao eliminar cofre.');
    }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositTarget || !depositAmount) return;
    setDepositError('');
    setDepositSubmitting(true);
    try {
      const updated = await apiFetch<SavingGoal>(`/saving-goals/${depositTarget.id}/deposit`, {
        method: 'POST',
        body: JSON.stringify({ amount: parseFloat(depositAmount) }),
      });
      setGoals(goals.map((g) => (g.id === updated.id ? updated : g)));
      setDepositTarget(null);
      setDepositAmount('');
    } catch (err) {
      setDepositError(err instanceof Error ? err.message : 'Erro ao depositar.');
    } finally {
      setDepositSubmitting(false);
    }
  };

  // Cálculos globais
  const totalSaved = goals.reduce((acc, curr) => acc + Number(curr.currentAmount), 0);
  const totalTarget = goals.reduce((acc, curr) => acc + Number(curr.targetAmount), 0);
  const globalProgress = totalTarget > 0 ? Math.min(100, Math.round((totalSaved / totalTarget) * 100)) : 0;

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-24 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        A carregar cofres...
      </div>
    );
  }

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
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-800/80 text-white font-semibold text-sm transition-all shadow-md shadow-[#431880]/20 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Criar Novo Cofre</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4">{error}</div>
      )}

      {/* CARDS DE RESUMO GLOBAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card Total Economizado */}
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between min-h-[140px] relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-xs font-medium text-purple-200 uppercase tracking-wider">Total em Cofres</p>
              <h3 className="text-2xl md:text-3xl font-extrabold mt-1">
                {formatKz(totalSaved)} <span className="text-sm font-normal">Kz</span>
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
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Objetivo Global</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {formatKz(totalTarget)} <span className="text-sm text-gray-500 font-normal">Kz</span>
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
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800">Progresso Global</h4>
              <p className="text-xs text-gray-500">Percentagem da meta total já alcançada</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mt-2">
            Já guardou <strong className="text-gray-800">{globalProgress}%</strong> do valor combinado de todos os seus cofres.
          </p>
        </div>

      </div>

      {/* GRID DE COFRES & METAS */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Os Seus Cofres Ativos</h3>

        {goals.length === 0 ? (
          <div className="bg-white p-10 rounded-xl border border-gray-200 shadow text-center text-sm text-gray-400">
            Ainda não criaste nenhum cofre. Cria o primeiro para começares a poupar.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const current = Number(goal.currentAmount);
              const target = Number(goal.targetAmount);
              const percentage = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

              return (
                <div
                  key={goal.id}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow hover:shadow-md transition-all flex flex-col justify-between gap-4"
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
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="text-gray-300 hover:text-red-600 transition-colors cursor-pointer"
                      aria-label="Eliminar cofre"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
                      <span className="font-bold text-gray-900">{formatKz(current)} Kz</span>
                      <span>Meta: {formatKz(target)} Kz</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>{goal.deadline ? `Prazo: ${new Date(goal.deadline).toLocaleDateString('pt-AO')}` : 'Sem prazo definido'}</span>
                    <button
                      onClick={() => { setDepositTarget(goal); setDepositAmount(''); setDepositError(''); }}
                      className="text-[#431880] font-bold hover:underline cursor-pointer"
                    >
                      + Depositar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL PARA NOVO COFRE */}
      <Modal open={isModalOpen} closeOnBackdrop onBackdropClick={() => setIsModalOpen(false)}>
        <form onSubmit={handleCreateGoal} className="flex flex-col gap-4 p-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Criar Novo Cofre</h3>
            <p className="text-xs text-gray-500">Defina um objetivo financeiro e comece a poupar</p>
          </div>

          {formError && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl p-3">{formError}</div>
          )}

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
                  min="0.01"
                  step="0.01"
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
                  min="0"
                  step="0.01"
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
              disabled={submitting}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#431880] hover:bg-[#341266] text-white text-xs font-semibold shadow-md shadow-[#431880]/15 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              Criar Cofre
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL DE DEPÓSITO */}
      <Modal open={!!depositTarget} closeOnBackdrop onBackdropClick={() => setDepositTarget(null)}>
        <form onSubmit={handleDeposit} className="flex flex-col gap-4 p-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Depositar em {depositTarget?.title}</h3>
            <p className="text-xs text-gray-500">Adicione um novo valor a este cofre</p>
          </div>

          {depositError && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl p-3">{depositError}</div>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Valor a Depositar (Kz)</label>
            <input
              type="number"
              required
              min="0.01"
              step="0.01"
              autoFocus
              placeholder="0.00"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#431880]"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => setDepositTarget(null)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={depositSubmitting}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#431880] hover:bg-[#341266] text-white text-xs font-semibold shadow-md shadow-[#431880]/15 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {depositSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              Depositar
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
