// src/services/auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';

export class AuthService {
  private userRepository = new UserRepository();

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

  async user(email: string, password: string) {
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
}
