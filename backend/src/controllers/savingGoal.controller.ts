// src/controllers/savingGoal.controller.ts
import { Request, Response } from 'express';
import { SavingGoalService } from '../services/savingGoal.service.js';

export class SavingGoalController {
  private savingGoalService = new SavingGoalService();

  async index(req: Request, res: Response) {
    try {
      const goals = await this.savingGoalService.listByUser(req.userId!);
      return res.status(200).json(goals);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar cofres.' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, category, targetAmount, currentAmount, deadline } = req.body;
      const goal = await this.savingGoalService.create(
        req.userId!,
        title,
        category,
        Number(targetAmount),
        currentAmount !== undefined ? Number(currentAmount) : undefined,
        deadline
      );
      return res.status(201).json(goal);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar cofre.';
      return res.status(400).json({ message });
    }
  }

  async deposit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { amount } = req.body;
      const goal = await this.savingGoalService.deposit(req.userId!, id as string, Number(amount));
      return res.status(200).json(goal);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao depositar no cofre.';
      return res.status(400).json({ message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.savingGoalService.delete(req.userId!, id as string);
      return res.status(200).json({ message: 'Cofre eliminado com sucesso.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao eliminar cofre.';
      return res.status(400).json({ message });
    }
  }
}
