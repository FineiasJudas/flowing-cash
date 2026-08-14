// src/controllers/dashboard.controller.ts
import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service.js';

export class DashboardController {
  private dashboardService = new DashboardService();

  async getSummary(req: Request, res: Response) {
    try {
      const now = new Date();
      const month = req.query.month ? Number(req.query.month) : now.getMonth() + 1;
      const year = req.query.year ? Number(req.query.year) : now.getFullYear();

      const summary = await this.dashboardService.getSummary(req.userId!, month, year);
      return res.status(200).json(summary);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao gerar resumo do dashboard.' });
    }
  }
}
