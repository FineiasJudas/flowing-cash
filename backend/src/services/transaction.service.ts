// src/services/transaction.service.ts
import { TransactionRepository } from '../repositories/transaction.repository.js';
import { CategoryRepository } from '../repositories/category.repository.js';
import { TransactionType } from '@prisma/client';
import { parseTransactionCSV } from '../utils/csvParser.js';

export class TransactionService {
  private transactionRepository = new TransactionRepository();
  private categoryRepository = new CategoryRepository();

  async listByUser(userId: string, startDate?: string, endDate?: string) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    return await this.transactionRepository.findByUserId(userId, start, end);
  }

  async create(
    userId: string,
    description: string,
    amount: number,
    date: string,
    type: TransactionType,
    categoryId: string
  ) {
    if (!description || !amount || !date || !type || !categoryId) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
    }

    if (amount <= 0) {
      throw new Error('O valor da transação deve ser maior que zero.');
    }

    // Valida se a categoria existe e pertence ao utilizador
    const category = await this.categoryRepository.findById(categoryId);
    if (!category || category.userId !== userId) {
      throw new Error('Categoria inválida ou não encontrada.');
    }

    return await this.transactionRepository.create({
      description,
      amount,
      date: new Date(date),
      type,
      userId,
      categoryId,
    });
  }

  async delete(userId: string, transactionId: string) {
    const transaction = await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      throw new Error('Transação não encontrada.');
    }

    if (transaction.userId !== userId) {
      throw new Error('Ação não autorizada.');
    }

    return await this.transactionRepository.delete(transactionId);
  }
  

async importFromCSV(userId: string, fileBuffer: Buffer) {
  const parsedRows = parseTransactionCSV(fileBuffer);

  if (parsedRows.length === 0) {
    throw new Error('O ficheiro CSV está vazio ou contém dados inválidos.');
  }

  // Procura por uma categoria padrão "Importados" ou pega a primeira existente
  let defaultCategory = (await this.categoryRepository.findByUserId(userId))[0];

  if (!defaultCategory) {
    defaultCategory = await this.categoryRepository.create({
      name: 'Importados',
      type: 'EXPENSE',
      color: '#64748b',
      userId,
    });
  }

  const createdTransactions = [];

  for (const row of parsedRows) {
    const transaction = await this.transactionRepository.create({
      description: row.description,
      amount: row.amount,
      date: new Date(row.date),
      type: row.type,
      userId,
      categoryId: defaultCategory.id,
    });
    createdTransactions.push(transaction);
  }

  return {
    importedCount: createdTransactions.length,
    transactions: createdTransactions,
  };
}
}
