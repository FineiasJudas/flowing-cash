'use client'

import { useEffect, useMemo, useState } from 'react';
import Modal from '@/components/modals/Modal';
import { apiFetch, apiUpload } from '@/services/api';
import {
  PlusCircle,
  Search,
  Filter,
  ArrowDownCircle,
  Receipt,
  Tag,
  Utensils,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";

type Category = {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  color: string | null;
  icon: string | null;
};

type Transaction = {
  id: string;
  description: string;
  amount: string | number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  category: Category;
};

function formatKz(value: number) {
  return value.toLocaleString('pt-AO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ExpensesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [importing, setImporting] = useState(false);
  const [importMessage, setImportMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Formulário do Modal
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const expenseCategories = useMemo(
    () => categories.filter((c) => c.type === 'EXPENSE'),
    [categories]
  );

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [transactionsData, categoriesData] = await Promise.all([
        apiFetch<Transaction[]>('/transactions'),
        apiFetch<Category[]>('/categories'),
      ]);
      setTransactions(transactionsData.filter((t) => t.type === 'EXPENSE'));
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar despesas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!categoryId && expenseCategories.length > 0) {
      setCategoryId(expenseCategories[0].id);
    }
  }, [expenseCategories, categoryId]);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!description || !amount || !categoryId) return;

    setSubmitting(true);
    try {
      const created = await apiFetch<Transaction>('/transactions', {
        method: 'POST',
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          date,
          type: 'EXPENSE',
          categoryId,
        }),
      });

      setTransactions([created, ...transactions]);
      setDescription('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setIsModalOpen(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erro ao registar despesa.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const previous = transactions;
    setTransactions(transactions.filter((t) => t.id !== id));
    try {
      await apiFetch(`/transactions/${id}`, { method: 'DELETE' });
    } catch (err) {
      setTransactions(previous);
      setError(err instanceof Error ? err.message : 'Erro ao eliminar despesa.');
    }
  };

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // permite reimportar o mesmo ficheiro depois
    if (!file) return;

    setImporting(true);
    setImportMessage('');
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await apiUpload<{ message: string }>('/transactions/import-csv', formData);
      setImportMessage(result.message);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao importar ficheiro CSV.');
    } finally {
      setImporting(false);
    }
  };

  // Filtragem
  const filteredExpenses = transactions.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || expense.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Cálculo do total
  const totalExpenses = transactions.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const categoryCounts = transactions.reduce<Record<string, number>>((acc, t) => {
    const name = t.category?.name || 'Outros';
    acc[name] = (acc[name] || 0) + Number(t.amount);
    return acc;
  }, {});
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-24 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        A carregar despesas...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">

      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestão de Despesas</h2>
          <p className="text-xs text-gray-500">Monitorize e gira todas as saídas de capital da tua conta</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-all cursor-pointer">
            {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>Importar CSV</span>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleImportCSV}
              disabled={importing}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setIsModalOpen(true)}
            disabled={expenseCategories.length === 0}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm transition-all shadow-md shadow-gray-800/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Registar Despesa</span>
          </button>
        </div>
      </div>

      {importMessage && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-xl p-4">{importMessage}</div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4">{error}</div>
      )}

      {/* CARDS DE MÉTRICAS RÁPIDAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#431880] flex items-center justify-center shrink-0">
            <ArrowDownCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total de Despesas</p>
            <h4 className="text-xl font-bold text-gray-800 mt-0.5">
              {formatKz(totalExpenses)} <span className="text-xs font-normal">Kz</span>
            </h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Maior Categoria</p>
            <h4 className="text-xl font-bold text-gray-800 mt-0.5">{topCategory}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Transações Registadas</p>
            <h4 className="text-xl font-bold text-gray-800 mt-0.5">{transactions.length} itens</h4>
          </div>
        </div>
      </div>

      {/* TABELA E FILTROS */}
      <div className="bg-white rounded-xl border border-gray-200 shadow overflow-hidden flex flex-col">

        {/* Barra de Pesquisa e Filtros */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar por descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#431880] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#431880] cursor-pointer"
            >
              <option value="Todas">Todas as Categorias</option>
              {expenseCategories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabela de Dados */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-6">Descrição</th>
                <th className="py-3 px-6">Categoria</th>
                <th className="py-3 px-6">Data</th>
                <th className="py-3 px-6 text-right">Valor</th>
                <th className="py-3 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-800">
                      {expense.description}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-purple-50 text-[#431880]"
                      >
                        <Tag className="w-3 h-3" />
                        {expense.category?.name}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500">
                      {new Date(expense.date).toLocaleDateString('pt-AO')}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-gray-900">
                      -{formatKz(Number(expense.amount))} Kz
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        aria-label="Eliminar despesa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    Nenhuma despesa encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PARA NOVA DESPESA */}
      <Modal open={isModalOpen} closeOnBackdrop onBackdropClick={() => setIsModalOpen(false)}>
        <form onSubmit={handleAddExpense} className="flex flex-col gap-4 p-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Nova Despesa</h3>
            <p className="text-xs text-gray-500">Preencha os detalhes da saída de capital</p>
          </div>

          {formError && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl p-3">{formError}</div>
          )}

          <div className="flex flex-col gap-3 mt-2">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Descrição</label>
              <input
                type="text"
                required
                placeholder="Ex: Aluguer, Compras de Supermercado..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#431880]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Valor (Kz)</label>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#431880]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Categoria</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#431880] cursor-pointer"
                >
                  {expenseCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Data</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#431880]"
              />
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
              Guardar Despesa
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
