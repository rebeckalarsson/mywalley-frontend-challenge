import { createContext } from "react";
import type { ITransactionContext } from "../types/context";
import { initialState } from "./transaction-reducer";

export const TransactionContext = createContext<ITransactionContext>({
  state: initialState,
  dispatch: () => {},
});
