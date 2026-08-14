// src/controllers/category.controller.ts
import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service.js';

export class CategoryController {
  private categoryService = new CategoryService();

  async index(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.listByUser(req.userId!);
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar categorias.' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, type, color, icon } = req.body;
      const category = await this.categoryService.create(req.userId!, name, type, color, icon);
      return res.status(201).json(category);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar categoria.';
      return res.status(400).json({ message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.categoryService.delete(req.userId!, id as string);
      return res.status(200).json({ message: 'Categoria eliminada com sucesso.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao eliminar categoria.';
      return res.status(400).json({ message });
    }
  }
}
