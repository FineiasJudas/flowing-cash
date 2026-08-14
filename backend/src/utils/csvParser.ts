// src/utils/csvParser.ts
import { parse } from 'csv-parse/sync';

export interface CSVTransactionRow {
  description: string;
  amount: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
}

/**
 * Espera um CSV com o cabeçalho: description,amount,date,type
 * Exemplo de linha: "Compra de Supermercado",25000,2026-07-15,EXPENSE
 */
export function parseTransactionCSV(buffer: Buffer): CSVTransactionRow[] {
  const records = parse(buffer, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return records.map((row: any) => {
    const rawAmount = parseFloat(row.amount);
    const type = row.type?.toUpperCase() === 'INCOME' ? 'INCOME' : 'EXPENSE';

    return {
      description: row.description || 'Transação Importada',
      amount: Math.abs(rawAmount),
      date: row.date,
      type,
    };
  });
}
