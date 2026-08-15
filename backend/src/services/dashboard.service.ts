// src/services/dashboard.service.ts
import { TransactionRepository } from '../repositories/transaction.repository.js';

export class DashboardService {
  private transactionRepository = new TransactionRepository();

  async getSummary(userId: string, month: number, year: number) {
    // Define o primeiro e o último dia do mês solicitado
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const transactions = await this.transactionRepository.findByUserId(userId, startDate, endDate);

    let totalIncome = 0;
    let totalExpense = 0;
    const categoryExpensesMap: Record<string, { name: string; amount: number; color: string }> = {};

    transactions.forEach((t) => {
      const amount = Number(t.amount);
      if (t.type === 'INCOME') {
        totalIncome += amount;
      } else {
        totalExpense += amount;

        // Agrupa gastos por categoria para o gráfico de pizza/rosca
        const catName = t.category.name;
        if (!categoryExpensesMap[catName]) {
          categoryExpensesMap[catName] = {
            name: catName,
            amount: 0,
            color: t.category.color || '#94a3b8',
          };
        }
        categoryExpensesMap[catName].amount += amount;
      }
    });

    const balance = totalIncome - totalExpense;
    const categoryExpenses = Object.values(categoryExpensesMap);

    return {
      period: { month, year },
      summary: {
        balance,
        totalIncome,
        totalExpense,
        transactionsCount: transactions.length,
      },
      categoryExpenses,
      recentTransactions: transactions.slice(0, 5), // As 5 transações mais recentes
    };
  }

  async getMonthlyOverview(userId: string, monthsCount: number = 6) {
    const now = new Date();
    const months: { month: number; year: number; label: string }[] = [];

    for (let i = monthsCount - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: d.getMonth() + 1,
        year: d.getFullYear(),
        label: d.toLocaleDateString('pt-PT', { month: 'short' }),
      });
    }

    const startDate = new Date(months[0].year, months[0].month - 1, 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const transactions = await this.transactionRepository.findByUserId(userId, startDate, endDate);

    return months.map(({ month, year, label }) => {
      let receitas = 0;
      let despesas = 0;

      transactions.forEach((t) => {
        const tDate = new Date(t.date);
        if (tDate.getMonth() + 1 === month && tDate.getFullYear() === year) {
          const amount = Number(t.amount);
          if (t.type === 'INCOME') receitas += amount;
          else despesas += amount;
        }
      });

      return { month: label, receitas, despesas };
    });
  }
}
