// src/services/auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';
import { CategoryRepository } from '../repositories/category.repository.js';

const DEFAULT_CATEGORIES: { name: string; type: 'INCOME' | 'EXPENSE'; color: string }[] = [
  { name: 'Salário', type: 'INCOME', color: '#10b981' },
  { name: 'Outras Receitas', type: 'INCOME', color: '#34d399' },
  { name: 'Alimentação', type: 'EXPENSE', color: '#f59e0b' },
  { name: 'Transporte', type: 'EXPENSE', color: '#3b82f6' },
  { name: 'Serviços', type: 'EXPENSE', color: '#8b5cf6' },
  { name: 'Lazer', type: 'EXPENSE', color: '#ec4899' },
  { name: 'Outros', type: 'EXPENSE', color: '#64748b' },
];

export class AuthService {
  private userRepository = new UserRepository();
  private categoryRepository = new CategoryRepository();

  async register(name: string, email: string, password: string) {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new Error('E-mail já se encontra registado.');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash,
    });

    // Cria categorias padrão para o novo utilizador começar a usar a app de imediato
    await Promise.all(
      DEFAULT_CATEGORIES.map((category) =>
        this.categoryRepository.create({ ...category, userId: user.id })
      )
    );

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas.');
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      throw new Error('Credenciais inválidas.');
    }

    const secret = process.env.JWT_SECRET || 'default_secret';
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1d' });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async me(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('Utilizador não encontrado.');
    }
    return user;
  }
}
