// src/repositories/transaction.repository.ts
import { prisma } from '../config/database.js';
import { TransactionType } from '@prisma/client';

export class TransactionRepository {
  async findByUserId(userId: string, startDate?: Date, endDate?: Date) {
    return await prisma.transaction.findMany({
      where: {
        userId,
        ...(startDate && endDate ? { date: { gte: startDate, lte: endDate } } : {}),
      },
      include: {
        category: {
          select: { id: true, name: true, color: true, icon: true, type: true }
        }
      },
      orderBy: { date: 'desc' },
    });
  }

  async findById(id: string) {
    return await prisma.transaction.findUnique({
      where: { id },
    });
  }

  async create(data: {
    description: string;
    amount: number;
    date: Date;
    type: TransactionType;
    userId: string;
    categoryId: string;
  }) {
    return await prisma.transaction.create({
      data,
      include: { category: true }
    });
  }

  async delete(id: string) {
    return await prisma.transaction.delete({
      where: { id },
    });
  }
}
