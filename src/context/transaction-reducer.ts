import type { ITransactionFilter, ITransactionState } from "../types/context";
import type { Transaction } from "../types/transaction";

export const initialState: ITransactionState = {
  filter: {
    transactionStatus: "all",
    paymentType: "all",
    paymentMethod: "all",
    installmentFrequency: "all",
    startDate: "",
    endDate: "",
  },
  transactions: [],
};

export type Action =
  | { type: "ADD_FILTER"; filter: ITransactionFilter }
  | { type: "REMOVE_FILTER"; filter: ITransactionFilter }
  | { type: "RESET_FILTER" }
  | { type: "UPDATE_TRANSACTIONS"; data: Transaction[] }
  | { type: "FILTER_TRANSACTIONS"; data: Transaction[] };

export function transactionReducer(state: ITransactionState, action: Action) {
  switch (action.type) {
    case "ADD_FILTER": {
      return {
        ...state,
        filter: { ...state.filter, ...action.filter },
      };
    }
    case "REMOVE_FILTER": {
      return {
        ...state,
        filter: { ...state.filter, ...action.filter },
      };
    }

    case "RESET_FILTER": {
      return {
        ...state,
        filter: {
          ...initialState.filter,
        },
      };
    }

    case "UPDATE_TRANSACTIONS": {
      return {
        ...state,
        transactions: action.data,
      };
    }
    default:
      return state;
  }
}
