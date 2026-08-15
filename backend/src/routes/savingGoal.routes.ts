// src/routes/savingGoal.routes.ts
import { Router } from 'express';
import { SavingGoalController } from '../controllers/savingGoal.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const savingGoalRoutes = Router();
const savingGoalController = new SavingGoalController();

savingGoalRoutes.use(authMiddleware);

savingGoalRoutes.get('/', (req, res) => savingGoalController.index(req, res));
savingGoalRoutes.post('/', (req, res) => savingGoalController.create(req, res));
savingGoalRoutes.post('/:id/deposit', (req, res) => savingGoalController.deposit(req, res));
savingGoalRoutes.delete('/:id', (req, res) => savingGoalController.delete(req, res));

export { savingGoalRoutes };
