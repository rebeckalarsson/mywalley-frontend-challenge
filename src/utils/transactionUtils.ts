import type { PaymentType } from "../types/transaction";

/**
 * Translates payment type to correct swedish. Would irl probably add translation files instead of these...
 * @param paymentType
 * @returns string [translated paymentType]
 */
export const translateTransactionType = (paymentType: PaymentType) => {
  switch (paymentType) {
    case "full":
      return "Fullständig";
    case "installment":
      return "Delbetalning";
    default:
      return paymentType;
  }
};
