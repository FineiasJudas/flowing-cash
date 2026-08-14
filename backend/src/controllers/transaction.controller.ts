// src/controllers/transaction.controller.ts
import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service.js';

export class TransactionController {
  private transactionService = new TransactionService();

  async index(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const transactions = await this.transactionService.listByUser(
        req.userId!,
        startDate as string,
        endDate as string
      );
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar transações.' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description, amount, date, type, categoryId } = req.body;
      const transaction = await this.transactionService.create(
        req.userId!,
        description,
        Number(amount),
        date,
        type,
        categoryId
      );
      return res.status(201).json(transaction);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar transação.';
      return res.status(400).json({ message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.transactionService.delete(req.userId!, id as string);
      return res.status(200).json({ message: 'Transação eliminada com sucesso.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao eliminar transação.';
      return res.status(400).json({ message });
    }
  }

async importCSV(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Por favor, envie um ficheiro CSV.' });
    }

    const result = await this.transactionService.importFromCSV(
      req.userId!,
      req.file.buffer
    );

    return res.status(201).json({
      message: `${result.importedCount} transações importadas com sucesso!`,
      data: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao processar ficheiro CSV.';
    return res.status(400).json({ message });
  }
}
}
