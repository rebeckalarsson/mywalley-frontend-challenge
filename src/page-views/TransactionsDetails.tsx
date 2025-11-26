import type {
  PaymentMethod,
  Transaction,
  InstallmentPlan,
} from "../types/transaction";

interface ITransactionDetails {
  transaction: Transaction;
}

export default function TransactionsDetails({
  transaction,
}: ITransactionDetails) {
  return (
    <div className="transaction-details-grid">
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

        return (
          <div key={key} className="grid-item">
            <span>{key}</span> <span>{value}</span>
          </div>
        );
      })}
    </div>
  );
}

const InstallmentPlanContainer = ({
  installmentPlan,
}: {
  installmentPlan: InstallmentPlan;
}) => {
  return (
    <div>
      {Object.entries(installmentPlan).map(([key, value]) => {
        return (
          <>
            <div>{key}</div>
            <div>{value}</div>
          </>
        );
      })}
    </div>
  );
};

const PaymentInformationContainer = ({
  paymentMethod,
}: {
  paymentMethod: PaymentMethod;
}) => {
  return (
    <div>
      {Object.values(paymentMethod).map((item, _i) => {
        return (
          <div key={"payment-method-item" + _i} className="payment-method-item">
            {item}
          </div>
        );
      })}
    </div>
  );
};
