import transactions from "../data/transactions.json";
import type { TransactionsData } from "../types/transaction";

export const getTransations = async () => {
  try {
    return transactions as TransactionsData;
  } catch (err) {
    console.error("Error fetching transactions:", err);
    throw err;
  }
};
