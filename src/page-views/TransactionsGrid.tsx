import type { Transaction } from "../types/transaction";
import clsx from "clsx";
import { formatDate } from "../utils/dateUtils";
import { formatCurrency } from "../utils/currencyUtils";
import { translateTransactionType } from "../utils/transactionUtils";

export default function TransactionsGrid({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <div className="transation-grid">
      <div className={clsx("grid-item", "merchant")}>
        {transaction.merchantName}
      </div>
      <div className={clsx("grid-item", "amount")}>
        <span>Summa:</span>
        <span>{formatCurrency(transaction.totalAmount)}</span>
      </div>
      <div className={clsx("grid-item", "date")}>
        <span>Transaktions datum:</span>
        <span>{formatDate(transaction.purchaseDate)}</span>
      </div>
      <div className={clsx("grid-item", "payment-type")}>
        <span>Transaktions typ:</span>
        <span>{translateTransactionType(transaction.paymentType)}</span>
      </div>
    </div>
  );
}
