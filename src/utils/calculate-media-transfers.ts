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

  const mediaTotalIncomeInYearCalc = totalMonthsIncome / totalInMonths.length;
  const mediaTotalIncomeInYear = Number.isNaN(mediaTotalIncomeInYearCalc) ? 0 : mediaTotalIncomeInYearCalc;

  const mediaTotalOutcomeInYearCalc = totalMonthsOutcome / totalInMonths.length;
  const mediaTotalOutcomeInYear = Number.isNaN(mediaTotalOutcomeInYearCalc) ? 0 : mediaTotalOutcomeInYearCalc;

  const totalReserveInSixMonths = mediaTotalOutcomeInYear * 6;
  const percentageCompletedInSixMonthsCalc = Math.floor((saldoTotal * 100) / totalReserveInSixMonths);
  const percentageCompletedInSixMonths = Number.isNaN(percentageCompletedInSixMonthsCalc) ? 100 : percentageCompletedInSixMonthsCalc;

  const totalReserveInTwelveMonths = mediaTotalOutcomeInYear * 12;
  const percentageCompletedInTwelveMonthsCalc = Math.floor((saldoTotal * 100) / totalReserveInTwelveMonths);
  const percentageCompletedInTwelveMonths = Number.isNaN(percentageCompletedInTwelveMonthsCalc) ? 100 : percentageCompletedInTwelveMonthsCalc;

  return { mediaTotalIncomeInYear, mediaTotalOutcomeInYear, totalReserveInSixMonths, percentageCompletedInSixMonths, totalReserveInTwelveMonths, percentageCompletedInTwelveMonths }
}