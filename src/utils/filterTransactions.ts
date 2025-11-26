import type { Transaction } from "../types/transaction";
import type { ITransactionFilter } from "../types/context";
import { isDateInRange } from "./dateUtils";

/**
 * Filters transactions based on the provided filter criteria.
 * If a filter is set to "all", that filter criterion is ignored.
 *
 * @param transactions - Array of transactions to filter
 * @param filters - Filter criteria object
 * @returns Filtered array of transactions
 */
export function filterTransactions(
  transactions: Transaction[],
  filters: ITransactionFilter
): Transaction[] {
  return transactions.filter((transaction) => {
    // Check transaction status filter
    if (
      filters.transactionStatus !== "all" &&
      transaction.status !== filters.transactionStatus
    ) {
      return false;
    }

    // Check payment type filter
    if (
      filters.paymentType !== "all" &&
      transaction.paymentType !== filters.paymentType
    ) {
      return false;
    }

    // Check payment method filter
    if (
      filters.paymentMethod !== "all" &&
      transaction.paymentMethod.type !== filters.paymentMethod
    ) {
      return false;
    }

    // Check installment frequency filter
    if (filters.installmentFrequency !== "all") {
      // If filtering by installment frequency, the transaction must be an installment
      // and have a matching frequency
      if (
        transaction.paymentType !== "installment" ||
        !transaction.installmentPlan ||
        transaction.installmentPlan.frequency !== filters.installmentFrequency
      ) {
        return false;
      }
    }

    // Check date range filter: only apply when both startDate and endDate are provided
    if (filters.startDate !== "" && filters.endDate !== "") {
      if (
        !isDateInRange(
          transaction.purchaseDate,
          filters.startDate,
          filters.endDate
        )
      ) {
        return false;
      }
    }

    return true;
  });
}
