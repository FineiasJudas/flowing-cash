// src/repositories/savingGoal.repository.ts
import { prisma } from '../config/database.js';

export class SavingGoalRepository {
  async findByUserId(userId: string) {
    return await prisma.savingGoal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return await prisma.savingGoal.findUnique({
      where: { id },
    });
  }

  async create(data: {
    title: string;
    category: string;
    targetAmount: number;
    currentAmount?: number;
    deadline?: Date | null;
    userId: string;
  }) {
    return await prisma.savingGoal.create({
      data,
    });
  }

  async incrementAmount(id: string, amount: number) {
    return await prisma.savingGoal.update({
      where: { id },
      data: { currentAmount: { increment: amount } },
    });
  }

  async delete(id: string) {
    return await prisma.savingGoal.delete({
      where: { id },
    });
  }
}
