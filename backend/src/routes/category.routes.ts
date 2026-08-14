// src/routes/category.routes.ts
import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const categoryRoutes = Router();
const categoryController = new CategoryController();

// Aplica o middleware de autenticação a todas as rotas deste módulo
categoryRoutes.use(authMiddleware);

categoryRoutes.get('/', (req, res) => categoryController.index(req, res));
categoryRoutes.post('/', (req, res) => categoryController.create(req, res));
categoryRoutes.delete('/:id', (req, res) => categoryController.delete(req, res));

export { categoryRoutes };
