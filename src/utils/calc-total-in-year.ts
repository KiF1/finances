import dayjs from "dayjs";
import { Transaction } from "../context/ContextApplication";

export interface TransactionsFormatedTotal{
  total: number;
  type: string;
}
export function calcTotalInYear(transactions: Transaction[]){
  const arrayTransactions = transactions.filter(transaction =>
    transaction.createdAt.split('/')[2] === String(dayjs().year())
  ).map(transaction => {
    return { total: transaction.value, type: transaction.type }
  });

  function calcTotal(transactionsFormatedTotal: TransactionsFormatedTotal[]) {
    let total = 0;
    let totalIncome = 0;
    let totalOutcome = 0;

    for (let transaction of transactionsFormatedTotal) {
      if(transaction.type === 'income'){
        total += transaction.total
        totalIncome += transaction.total;
      }else{
        total -= transaction.total
        totalOutcome += transaction.total;
      }
    }
    return { total, totalIncome, totalOutcome };
  }

  return calcTotal(arrayTransactions)
}