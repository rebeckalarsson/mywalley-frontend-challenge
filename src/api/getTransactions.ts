import transactions from "../data/transactions.json";

export const getTransations = async () => {
  try {
    return transactions;
  } catch (err) {
    console.error("Error fetching transactions:", err);
    throw err;
  }
};
