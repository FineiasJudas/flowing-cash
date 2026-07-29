// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`🚀 Servidor FlowingCash a rodar em: http://localhost:${PORT}`);
});
