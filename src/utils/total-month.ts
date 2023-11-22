// import dayjs from "dayjs";
import { Transaction } from "../context/ContextApplication";

export function totalInMonth(transactions: Transaction[], year: number, month: number){
  // const monthsInYear = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  // const monthSelected = dayjs(`01/${month}/${year}`);

  const transactionsMonthFiltered = transactions.filter(transaction => {
    const monthTransaction = parseInt(transaction.createdAt.split('/')[1])
    const yearTransaction = parseInt(transaction.createdAt.split('/')[2])

    return monthTransaction === month && yearTransaction === year
  });

  for(let tenDaysLoop = 0; tenDaysLoop <= 3; tenDaysLoop++){
  }
}