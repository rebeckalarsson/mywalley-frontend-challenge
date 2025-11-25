import { useCallback, useEffect, useState } from "react";
import { getTransations } from "../api/getTransactions";
import Card from "../components/Card";
import Spinner from "../components/Spinner";

export default function Transactions() {
  const [loading, setLoading] = useState<boolean>(true);
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
          <Card />
        </div>
      )}
    </>
  );
}
