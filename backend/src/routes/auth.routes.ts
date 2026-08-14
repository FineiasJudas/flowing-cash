// src/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', (req, res) => authController.register(req, res));
authRoutes.post('/login', (req, res) => authController.login(req, res));
authRoutes.get('/user', (req, res) => authController.user(req, res));

export { authRoutes };
