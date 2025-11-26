import clsx from "clsx";
import { CardItem } from "../components/Card";
import type {
  PaymentMethod,
  Transaction,
  InstallmentPlan,
} from "../types/transaction";
import { formatCurrency } from "../utils/currencyUtils";
import { formatDate, isPastDate } from "../utils/dateUtils";
import TransactionsGrid from "./TransactionsGrid";

interface ITransactionDetails {
  transaction: Transaction;
}

export default function TransactionsDetails({
  transaction,
}: ITransactionDetails) {
  return (
    <div className="transaction-details-grid">
      <TransactionsGrid transaction={transaction} />
      {Object.entries(transaction).map(([key, value]) => {
        if (key === "paymentMethod") {
          return (
            <PaymentInformationContainer paymentMethod={value} key={key} />
          );
        }

        if (key === "installmentPlan") {
          return <InstallmentPlanContainer installmentPlan={value} key={key} />;
        }

        //If ner object values were to be added to transaction object and are not defined, dont map these.
        if (typeof value === "object") {
          return;
        }
      })}
    </div>
  );
}

const InstallmentPlanContainer = ({
  installmentPlan,
}: {
  installmentPlan: InstallmentPlan;
}) => {
  const hasAllInstallmentsPaid = () =>
    installmentPlan.paidInstallments === installmentPlan.totalInstallments;

  return (
    <CardItem
      className={clsx("transation-grid", hasAllInstallmentsPaid() && "success")}
    >
      <div className="grid-item">
        <span>Betalfrekvens</span>
        <span>{installmentPlan.frequency}</span>
      </div>
      <div className="grid-item">
        <span>Att betala in</span>
        <span>{formatCurrency(installmentPlan.installmentAmount)}</span>
      </div>
      <div className="grid-item">
        <span>Nästa betaldatum</span>
        <span
          className={clsx(
            isPastDate(installmentPlan.nextPaymentDate) && "error"
          )}
        >
          {formatDate(installmentPlan.nextPaymentDate)}
        </span>
      </div>
      <div className="grid-item">
        <span>Antal betalade</span>
        <span>{installmentPlan.paidInstallments}</span>
      </div>
      <div className="grid-item">
        <span>Totalt antal betalningar</span>
        <span>{installmentPlan.totalInstallments}</span>
      </div>
    </CardItem>
  );
};

const PaymentInformationContainer = ({
  paymentMethod,
}: {
  paymentMethod: PaymentMethod;
}) => {
  return (
    <CardItem className="transation-grid">
      <div className="grid-item">
        <span>Betalmetod</span>
        <span>{paymentMethod.type}</span>
      </div>
      <div className="grid-item">
        <span>Sista 4 siffrorna</span>
        <span>{paymentMethod.last4}</span>
      </div>
    </CardItem>
  );
};
