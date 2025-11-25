import { useState } from "react";
import { CardItem } from "../components/Card";
import type { Transaction } from "../types/transaction";

export default function TransactionsGrid({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <>
      <div>{transaction.merchantName}</div>
      <div>{transaction.paymentType}</div>
      <div></div>
      <div></div>
      <div></div>
    </>
  );
}
