// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
  private authService = new AuthService();

  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }

      const user = await this.authService.register(name, email, password);
      return res.status(201).json({ user, message: "Usuario criado com sucesso! Agora e so fazer o login." });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao registar utilizador.';
      return res.status(400).json({ message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email e palavra-passe são obrigatórios.' });
      }

      const result = await this.authService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao efetuar login.';
      return res.status(401).json({ message });
    }
  }

    async user(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email e palavra-passe são obrigatórios.' });
      }

      const result = await this.authService.user(email, password);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao efetuar login.';
      return res.status(401).json({ message });
    }
  }
}
