import { Transaction } from "../context/ContextApplication";
import { filterTransactionsByYear } from "./filter-transactions-by-year";

export interface TransactionsFormatedTotal{
  total: number;
  type: string;
}
export function calcTotalInYear(transactions: Transaction[], yearSelected: number){
  const arrayTransactionsPerMonth = filterTransactionsByYear(transactions!, yearSelected);

  let balanceInTheYear = 0;
  let incomesInTheYear = 0;
  let outcomesInTheYear = 0;

  for(let month of arrayTransactionsPerMonth){
    balanceInTheYear += month.saldo
    incomesInTheYear += month.entradas
    outcomesInTheYear += month.saídas
  }

  return { balanceInTheYear, incomesInTheYear, outcomesInTheYear };
}