// src/services/savingGoal.service.ts
import { SavingGoalRepository } from '../repositories/savingGoal.repository.js';

export class SavingGoalService {
  private savingGoalRepository = new SavingGoalRepository();

  async listByUser(userId: string) {
    return await this.savingGoalRepository.findByUserId(userId);
  }

  async create(
    userId: string,
    title: string,
    category: string,
    targetAmount: number,
    currentAmount?: number,
    deadline?: string
  ) {
    if (!title || !category || !targetAmount) {
      throw new Error('Nome, categoria e meta pretendida são obrigatórios.');
    }

    if (targetAmount <= 0) {
      throw new Error('A meta pretendida deve ser maior que zero.');
    }

    if (currentAmount !== undefined && currentAmount < 0) {
      throw new Error('O depósito inicial não pode ser negativo.');
    }

    return await this.savingGoalRepository.create({
      title,
      category,
      targetAmount,
      currentAmount: currentAmount ?? 0,
      deadline: deadline ? new Date(deadline) : null,
      userId,
    });
  }

  async deposit(userId: string, goalId: string, amount: number) {
    if (!amount || amount <= 0) {
      throw new Error('O valor do depósito deve ser maior que zero.');
    }

    const goal = await this.savingGoalRepository.findById(goalId);
    if (!goal) {
      throw new Error('Cofre não encontrado.');
    }
    if (goal.userId !== userId) {
      throw new Error('Ação não autorizada.');
    }

    return await this.savingGoalRepository.incrementAmount(goalId, amount);
  }

  async delete(userId: string, goalId: string) {
    const goal = await this.savingGoalRepository.findById(goalId);

    if (!goal) {
      throw new Error('Cofre não encontrado.');
    }

    if (goal.userId !== userId) {
      throw new Error('Ação não autorizada.');
    }

    return await this.savingGoalRepository.delete(goalId);
  }
}
