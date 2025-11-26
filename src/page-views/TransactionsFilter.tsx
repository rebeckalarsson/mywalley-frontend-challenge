import { useContext, useEffect, useState } from "react";
import { Select, type ISelectItems } from "../components/Select";
import { TransactionContext } from "../context/transaction-context";
import type { ITransactionFilter } from "../types/context";
import { SlidersHorizontal } from "lucide-react";
import Button from "../components/Button";
import { DatePicker } from "../components/DatePicker";

export default function TransactionsFilter() {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const { state, dispatch } = useContext(TransactionContext);

  const transactionStatusItems: ISelectItems[] = [
    { value: "all", label: "Alla" },
    { value: "completed", label: "Avslutade" },
    { value: "pending", label: "Pågående" },
    { value: "failed", label: "Misslyckade" },
    { value: "cancelled", label: "Avbruten" },
    { value: "active", label: "Aktiv" },
  ];

  const paymentMethodItems: ISelectItems[] = [
    { value: "all", label: "Alla" },
    { label: "Kredit kort", value: "credit_card" },
    { label: "Bank konto", value: "bank_account" },
    { label: "Debit kort", value: "debit_card" },
  ];

  const paymentTypeItems: ISelectItems[] = [
    { value: "all", label: "Alla" },
    { label: "Fullständig", value: "full" },
    { label: "Delbetalning", value: "installment" },
  ];

  const installmentFreqItems: ISelectItems[] = [
    { value: "all", label: "Alla" },
    { label: "Per månad", value: "monthly" },
    { label: "Per vecka", value: "biweekly" },
  ];

  const dateRangeItem: ISelectItems[] = [
    { value: "all", label: "Alla" },
    { label: "Per månad", value: "monthly" },
    { value: "all", label: "Alla" },
  ];

  const handleFilterChange = (
    filterType: keyof ITransactionFilter,
    value: string
  ) => {
    dispatch({
      type: "ADD_FILTER",
      filter: {
        [filterType]: value,
      } as unknown as ITransactionFilter,
    });
  };

  useEffect(() => {
    console.log({ state: state.filter });
  }, [state.filter]);

  return (
    <div className="filter-container">
      <Button
        variant="navigation"
        aria-label="show filter"
        onClick={() => setShowFilter(!showFilter)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setShowFilter(!showFilter);
          }
        }}
      >
        <SlidersHorizontal size={20} aria-label="filter" role="img" />
      </Button>

      <>
        {showFilter && (
          <>
            <Select
              inputLabel="Transaktions status"
              valueSelect={state.filter.transactionStatus}
              onChange={(e) =>
                handleFilterChange("transactionStatus", e.target.value)
              }
              selectItems={transactionStatusItems}
            />
            <Select
              inputLabel="Betalmetod"
              valueSelect={state.filter.paymentMethod}
              onChange={(e) =>
                handleFilterChange("paymentMethod", e.target.value)
              }
              selectItems={paymentMethodItems}
            />
            <Select
              inputLabel="Betaltyp"
              valueSelect={state.filter.paymentType}
              onChange={(e) =>
                handleFilterChange("paymentType", e.target.value)
              }
              selectItems={paymentTypeItems}
            />
            <Select
              inputLabel="Installment Frequency"
              valueSelect={state.filter.installmentFrequency}
              onChange={(e) =>
                handleFilterChange("installmentFrequency", e.target.value)
              }
              selectItems={installmentFreqItems}
            />
            <DatePicker
              name="startDate"
              inputLabel="Datum från"
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              placeholder=""
            />
            <DatePicker
              inputLabel="Datum till"
              name="endDate"
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              placeholder=""
            />
          </>
        )}
      </>
    </div>
  );
}
