// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './config/database.js';

import { authRoutes } from './routes/auth.routes.js';
import { categoryRoutes } from './routes/category.routes.js';
import { transactionRoutes } from './routes/transaction.routes.js';
import { dashboardRoutes } from './routes/dashboard.routes.js';
import { savingGoalRoutes } from './routes/savingGoal.routes.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Define o array explicitamente como (string | RegExp)[] ou apenas strings
const allowedOrigins: (string | RegExp)[] = [
  'http://localhost:3000',
  'https://mock-interview-premiun.vercel.app',
];

// Middlewares globais
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/saving-goals', savingGoalRoutes);

// Rota de Health Check / Teste de Conexão com o Banco
app.get('/health', async (req, res) => {
  try {
    // Executa uma consulta simples para validar conexão com a base de dados
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({ 
      status: 'OK', 
      message: 'Servidor FlowingCash e Base de Dados operacionais!' 
    });
  } catch (error) {
    return res.status(500).json({ 
      status: 'ERROR', 
      message: 'Erro na conexão com a base de dados.',
      details: error instanceof Error ? error.message : error
    });
  }
});

// Middleware de tratamento de erros (deve ser o último a ser registado)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor FlowingCash a rodar em: http://localhost:${PORT}`);
});
