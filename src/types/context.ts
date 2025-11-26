import type { Action } from "../context/transaction-reducer";
import type {
  InstallmentFrequency,
  PaymentMethodType,
  PaymentType,
  Transaction,
  TransactionStatus,
} from "./transaction";

export interface ITransactionState {
  filter: ITransactionFilter;
  transactions: Transaction[];
}

export interface ITransactionContext {
  state: ITransactionState;
  dispatch: React.ActionDispatch<[action: Action]>;
}

export interface ITransactionFilter {
  transactionStatus: TransactionStatus | "all";
  paymentType: PaymentType | "all";
  paymentMethod: PaymentMethodType | "all";
  installmentFrequency: InstallmentFrequency | "all";
  startDate: string;
  endDate: string;
}
