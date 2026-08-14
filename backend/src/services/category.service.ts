// src/services/category.service.ts
import { CategoryRepository } from '../repositories/category.repository.js';
import { TransactionType } from '@prisma/client';

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async listByUser(userId: string) {
    return await this.categoryRepository.findByUserId(userId);
  }

  async create(userId: string, name: string, type: TransactionType, color?: string, icon?: string) {
    if (!name || !type) {
      throw new Error('Nome e Tipo de categoria são obrigatórios.');
    }

    if (!['INCOME', 'EXPENSE'].includes(type)) {
      throw new Error('Tipo de categoria inválido. Use INCOME ou EXPENSE.');
    }

    return await this.categoryRepository.create({
      name,
      type,
      color,
      icon,
      userId,
    });
  }

  async delete(userId: string, categoryId: string) {
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw new Error('Categoria não encontrada.');
    }

    if (category.userId !== userId) {
      throw new Error('Ação não autorizada.');
    }

    return await this.categoryRepository.delete(categoryId);
  }
}
