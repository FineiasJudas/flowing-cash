'use client'

import { useState } from 'react';
import Modal from '@/components/modals/Modal';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  ArrowDownCircle, 
  Receipt, 
  Calendar, 
  Tag, 
  DollarSign,
  ShoppingCart,
  Home,
  Utensils,
  Car,
  Tv
} from "lucide-react";

// Tipo para as transações de despesa
type Expense = {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
};

// Dados de exemplo para inicializar a tabela
const initialExpenses: Expense[] = [
  { id: '1', description: 'Compras do Mês - Kero', category: 'Alimentação', amount: 85000, date: '2026-08-12' },
  { id: '2', description: 'Pagamento de Internet Zap', category: 'Serviços', amount: 25000, date: '2026-08-10' },
  { id: '3', description: 'Combustível - Sonangol', category: 'Transporte', amount: 15000, date: '2026-08-08' },
  { id: '4', description: 'Mensalidade do Ginásio', category: 'Lazer', amount: 30000, date: '2026-08-05' },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Formulário do Modal
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Alimentação');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Adicionar nova despesa
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      category,
      amount: parseFloat(amount),
      date
    };

    setExpenses([newExpense, ...expenses]);
    
    // Resetar campos
    setDescription('');
    setAmount('');
    setCategory('Alimentação');
    setIsModalOpen(false);
  };

  // Filtragem
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Cálculo do total
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestão de Despesas</h2>
          <p className="text-xs text-gray-500">Monitorize e gira todas as saídas de capital da tua conta</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#431880] hover:bg-[#341266] text-white font-semibold text-sm transition-all shadow-md shadow-[#431880]/20 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Registar Despesa</span>
        </button>
      </div>

      {/* CARDS DE MÉTRICAS RÁPIDAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#431880] flex items-center justify-center shrink-0">
            <ArrowDownCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total de Despesas</p>
            <h4 className="text-xl font-bold text-gray-800 mt-0.5">
              {totalExpenses.toLocaleString('pt-AO')} <span className="text-xs font-normal">Kz</span>
            </h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Maior Categoria</p>
            <h4 className="text-xl font-bold text-gray-800 mt-0.5">Alimentação</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Transações Registadas</p>
            <h4 className="text-xl font-bold text-gray-800 mt-0.5">{expenses.length} itens</h4>
          </div>
        </div>
      </div>

      {/* TABELA E FILTROS */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        
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
              <option value="Alimentação">Alimentação</option>
              <option value="Serviços">Serviços</option>
              <option value="Transporte">Transporte</option>
              <option value="Lazer">Lazer</option>
              <option value="Outros">Outros</option>
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
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-purple-50 text-[#431880]">
                        <Tag className="w-3 h-3" />
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500">
                      {new Date(expense.date).toLocaleDateString('pt-AO')}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-gray-900">
                      -{expense.amount.toLocaleString('pt-AO')} Kz
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
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
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#431880]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#431880] cursor-pointer"
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Serviços">Serviços</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Outros">Outros</option>
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
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#431880] hover:bg-[#341266] text-white text-xs font-semibold shadow-md shadow-[#431880]/15"
            >
              Guardar Despesa
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
