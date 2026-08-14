// src/repositories/category.repository.ts
import { prisma } from '../config/database.js';
import { TransactionType } from '@prisma/client';

export class CategoryRepository {
  async findByUserId(userId: string) {
    return await prisma.category.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    return await prisma.category.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string; type: TransactionType; color?: string; icon?: string; userId: string }) {
    return await prisma.category.create({
      data,
    });
  }

  async delete(id: string) {
    return await prisma.category.delete({
      where: { id },
    });
  }
}
