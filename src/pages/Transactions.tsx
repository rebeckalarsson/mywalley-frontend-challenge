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

  const fetchTransactions = async () => {
    await getTransations()
      .then((resp) => {
        console.log({ resp });
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

    // console.log({ data });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {transactions.length ? (
            <>
              {transactions.map((trans, _i) => {
                <CardItem
                  onClick={() => console.log("Show drawer")}
                  children={
                    <TransactionsGrid
                      transaction={trans}
                      key={"transaction-key" + _i}
                    />
                  }
                />;
              })}
            </>
          ) : (
            <CardItem className="no-content-container">
              <SearchX size={20} area-label="no content" />
              <p>
                Ojdå! Här var det tomt. Du har inga registrerade transaktioner
                än.
              </p>
            </CardItem>
          )}
          <Drawer isOpen={true} children={<>Hello</>} />
        </div>
      )}
    </>
  );
}
