import { Bank, Transaction } from "../context/ContextApplication";
import { filterTransactionsByYear } from "./filter-transactions-by-year";

export function calculateMediaTransfersInYear(transactions: Transaction[], banks: Bank[]){
  const yearAtual = new Date().getFullYear();
  const transactionsInYear = transactions.filter(transaction => parseInt(transaction.createdAt.split('/')[2]) === yearAtual);

  let saldoTotal = 0;

  for(let transaction of transactions){
    if(transaction.type === 'income'){
      saldoTotal += transaction.value
    }else{
      saldoTotal -= transaction.value
    }
  }

  const totalInMonths = filterTransactionsByYear(transactionsInYear, banks, yearAtual);

  let totalMonthsIncome = 0
  let totalMonthsOutcome = 0

  for(let month of totalInMonths){
    totalMonthsIncome += month.entradas
    totalMonthsOutcome += month.saídas
  }

  const mediaTotalIncomeInYear = totalMonthsIncome / totalInMonths.length;
  const mediaTotalOutcomeInYear = totalMonthsOutcome / totalInMonths.length;
  const totalReserveInSixMonths = mediaTotalOutcomeInYear * 6;
  const percentageCompletedInSixMonths = Math.floor((saldoTotal * 100) / totalReserveInSixMonths);
  const totalReserveInTwelveMonths = mediaTotalOutcomeInYear * 12;
  const percentageCompletedInTwelveMonths = Math.floor((saldoTotal * 100) / totalReserveInTwelveMonths);

  return { mediaTotalIncomeInYear, mediaTotalOutcomeInYear, totalReserveInSixMonths, percentageCompletedInSixMonths, totalReserveInTwelveMonths, percentageCompletedInTwelveMonths }
}