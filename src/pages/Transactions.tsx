import { useCallback, useEffect } from "react";
import { getTransations } from "../api/getTransactions";
import Card from "../components/card";
import Footer from "../components/Footer";

export default function Transactions() {
  const fetchTransactions = async () => {
    await getTransations()
      .then((resp) => {
        console.log({ resp });
      })
      .catch((err) => {
        console.error("Could not fetch transactions: ", { err });
        throw err;
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTransactions();
    }, 1000);
    return () => clearTimeout(timeoutId);

    // console.log({ data });
  }, []);

  return (
    <div>
      <Card />
    </div>
  );
}
