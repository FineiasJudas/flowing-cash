// src/middlewares/upload.middleware.ts
import multer from 'multer';

// Utiliza armazenamento em memória RAM para ser mais rápido e limpo
const storage = multer.memoryStorage();

export const uploadCSV = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas ficheiros em formato CSV são permitidos.'));
    }
  },
});
