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
  const mediaTotalIncomeInYear = Number.isNaN(mediaTotalIncomeInYearCalc) ? 0 : mediaTotalIncomeInYearCalc.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const mediaTotalOutcomeInYearCalc = totalMonthsOutcome / totalInMonths.length;
  const mediaTotalOutcomeInYear = Number.isNaN(mediaTotalOutcomeInYearCalc) ? 0 : mediaTotalOutcomeInYearCalc;
  const mediaTotalOutcomeFormatted = mediaTotalOutcomeInYear.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const totalReserveInSixMonths = mediaTotalOutcomeInYear * 6;
  const totalReserveInSixMonthsFormatted = totalReserveInSixMonths.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const percentageCompletedInSixMonthsCalc = Math.floor((saldoTotal * 100) / totalReserveInSixMonths);
  const percentageCompletedInSixMonths = percentageCompletedInSixMonthsCalc >= 0 ? percentageCompletedInSixMonthsCalc : 0;

  const totalReserveInTwelveMonths = mediaTotalOutcomeInYear * 12;
  const totalReserveInTwelveMonthsFormatted = totalReserveInTwelveMonths.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const percentageCompletedInTwelveMonthsCalc = Math.floor((saldoTotal * 100) / totalReserveInTwelveMonths);
  const percentageCompletedInTwelveMonths = percentageCompletedInTwelveMonthsCalc >= 0 ? percentageCompletedInTwelveMonthsCalc : 0;

  return { 
    mediaTotalIncomeInYear, 
    mediaTotalOutcomeInYear: mediaTotalOutcomeFormatted, 
    totalReserveInSixMonths: totalReserveInSixMonthsFormatted, 
    percentageCompletedInSixMonths, 
    totalReserveInTwelveMonths: totalReserveInTwelveMonthsFormatted, 
    percentageCompletedInTwelveMonths }
}