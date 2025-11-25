import { useEffect, useState } from "react";
import { getTransations } from "../api/getTransactions";
import Spinner from "../components/Spinner";
import Drawer from "../components/Drawer";
import type { Transaction } from "../types/transaction";
import { CardItem } from "../components/Card";
import TransactionsGrid from "../page-views/TransactionsGrid";
import { SearchX } from "lucide-react";

export default function Transactions() {
  const [loading, setLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [drawer, setDrawer] = useState<{
    content?: Transaction;
    isOpen: boolean;
  }>({
    content: undefined,
    isOpen: false,
  });
  const toggleDrawer = (transaction: Transaction, shouldOpen: boolean) =>
    setDrawer({
      content: transaction,
      isOpen: shouldOpen,
    });

  const fetchTransactions = async () => {
    await getTransations()
      .then((resp) => {
        console.log({ resp });
        setTransactions(resp.transactions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Could not fetch transactions: ", { err });
        throw err;
      });
  };

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      fetchTransactions();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    console.log({ transactions, length: transactions.length });
  }, [transactions]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Drawer
            isOpen={drawer.isOpen}
            children={
              <>
                {drawer.content ? (
                  <div>{drawer.content.id}</div>
                ) : (
                  <CardItem className="no-content-container">
                    <SearchX size={20} area-label="no content" />
                    <p>
                      Hoppsan! Här gick något fel, vi kan inte visa denna
                      transaktionen. Kontakta kundservice för vidare hjälp!
                    </p>
                  </CardItem>
                )}
              </>
            }
          />
          {transactions.length ? (
            <div className="transactions-container">
              {transactions.map((trans, _i) => {
                return (
                  <CardItem
                    onClick={() => toggleDrawer(trans, true)}
                    children={
                      <TransactionsGrid
                        transaction={trans}
                        key={"transaction-key" + _i}
                      />
                    }
                  />
                );
              })}
            </div>
          ) : (
            <CardItem className="no-content-container">
              <SearchX size={20} area-label="no content" />
              <p>
                Ojdå! Här var det tomt. Du har inga registrerade transaktioner
                än.
              </p>
            </CardItem>
          )}
        </div>
      )}
    </>
  );
}
