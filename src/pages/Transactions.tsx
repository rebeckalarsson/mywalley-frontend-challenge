import { useContext, useEffect, useState, useMemo } from "react";
import { getTransations } from "../api/getTransactions";
import Spinner from "../components/Spinner";
import Drawer from "../components/Drawer";
import type { Transaction } from "../types/transaction";
import { CardItem } from "../components/Card";
import TransactionsGrid from "../page-views/TransactionsGrid";
import { SearchX } from "lucide-react";
import Button from "../components/Button";
import TransactionsDetails from "../page-views/TransactionsDetails";
import TransactionsFilter from "../page-views/TransactionsFilter";
import { TransactionContext } from "../context/transaction-context";
import { filterTransactions } from "../utils/filterTransactions";
import clsx from "clsx";

export default function Transactions() {
  const [loading, setLoading] = useState<boolean>(true);
  const { state, dispatch } = useContext(TransactionContext);
  const [drawer, setDrawer] = useState<{
    content?: Transaction;
    isOpen: boolean;
  }>({
    content: undefined,
    isOpen: false,
  });
  const openDrawer = (transaction: Transaction, shouldOpen: boolean) =>
    setDrawer({
      content: transaction,
      isOpen: shouldOpen,
    });

  const closeDrawer = () => {
    setDrawer({
      ...drawer,
      isOpen: false,
    });
  };

  const fetchTransactions = async () => {
    await getTransations()
      .then((resp) => {
        console.log({ resp });
        dispatch({
          type: "UPDATE_TRANSACTIONS",
          data: resp.transactions,
        });
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
    console.log({
      transactions: state.transactions,
      length: state.transactions.length,
    });
  }, [state.transactions]);

  const filteredTransactions = useMemo(
    () => filterTransactions(state.transactions, state.filter),
    [state.transactions, state.filter]
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Drawer
            anchor="right"
            open={drawer.isOpen}
            onCloseDrawer={closeDrawer}
            children={
              <div className="drawer-content">
                {drawer.content ? (
                  <TransactionsDetails transaction={drawer.content} />
                ) : (
                  <CardItem className="no-content-container">
                    <SearchX size={20} area-label="no content" />
                    <p>
                      Hoppsan! Här gick något fel, vi kan inte visa denna
                      transaktionen. Kontakta kundservice för vidare hjälp!
                    </p>
                  </CardItem>
                )}
                <Button
                  variant="primary"
                  onClick={closeDrawer}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      closeDrawer();
                    }
                  }}
                >
                  Stäng
                </Button>
              </div>
            }
          />
          {state.transactions.length ? (
            <>
              <TransactionsFilter />
              <div className="transactions-container">
                {filteredTransactions.length ? (
                  filteredTransactions.map((trans, _i) => {
                    return (
                      <CardItem
                        key={"transaction-card-key" + _i}
                        className={clsx(
                          trans.status === "failed" && "error",
                          trans.status === "cancelled" && "warning"
                        )}
                        onClick={() => openDrawer(trans, true)}
                        children={<TransactionsGrid transaction={trans} />}
                      />
                    );
                  })
                ) : (
                  <CardItem className="no-content-container">
                    <SearchX size={20} area-label="no content" />
                    <p>
                      Du har inga transaktioner som stämmer in på dessa filter.
                    </p>
                  </CardItem>
                )}
              </div>
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
        </div>
      )}
    </>
  );
}
