import { useState } from "react";
import { CardItem } from "../components/Card";
import type { Transaction } from "../types/transaction";
import Drawer from "../components/Drawer";

export default function TransactionsGrid({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <CardItem onClick={toggleDrawer}>
        <div>{transaction.merchantName}</div>
        <div>{transaction.paymentType}</div>
        <div></div>
        <div></div>
        <div></div>
      </CardItem>
      <Drawer isOpen children={<>Hello I am open! </>} />
    </>
  );
}
