// src/routes/dashboard.routes.ts
import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

dashboardRoutes.use(authMiddleware);

dashboardRoutes.get('/summary', (req, res) => dashboardController.getSummary(req, res));
dashboardRoutes.get('/monthly-overview', (req, res) => dashboardController.getMonthlyOverview(req, res));

export { dashboardRoutes };
