// src/routes/transaction.routes.ts
import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { uploadCSV } from '../middlewares/upload.middleware.js';

const transactionRoutes = Router();
const transactionController = new TransactionController();

transactionRoutes.use(authMiddleware);

transactionRoutes.get('/', (req, res) => transactionController.index(req, res));
transactionRoutes.post('/', (req, res) => transactionController.create(req, res));
transactionRoutes.delete('/:id', (req, res) => transactionController.delete(req, res));
// Adicionar em src/routes/transaction.routes.ts


// ...
transactionRoutes.post('/import-csv', uploadCSV.single('file'), // 'file' é o nome do campo no multipart form
  (req, res) => transactionController.importCSV(req, res)
);

export { transactionRoutes };
