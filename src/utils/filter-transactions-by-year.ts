import dayjs from "dayjs";
import { Transaction } from "../context/ContextApplication";

export interface TransactionsFormatedDayAndTotal{
  date: string;
  total: number;
  type: string;
  method: string;
  installments: number | undefined;
}

export function filterTransactionsByYear(transactions: Transaction[], year: number){
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const transactionsInstallments = transactions.filter(transaction => transaction.method.split('_')[0] === 'credit');

  function calcTotalInMonth(transactionsFormatedDayAndTotal: TransactionsFormatedDayAndTotal[], monthActual: number) {
    let total = 0;
    let totalIncome = 0;
    let totalOutcome = 0;

    const invoiceClosingDay = 12;

    for (let transaction of transactionsFormatedDayAndTotal) {
      const dayActualTransaction = parseInt(transaction.date.split('/')[0])

      if(transaction.type === 'income'){
        total += transaction.total;
        totalIncome += transaction.total;
      }else if(transaction.method.split('_')[0] === 'credit' && transaction.installments && dayActualTransaction < invoiceClosingDay){
        const installmentAmount = transaction.total / transaction.installments;
        total -= installmentAmount
        totalOutcome += installmentAmount
      }else{
        total -= transaction.total
        totalOutcome += transaction.total
      }

    }

    for(let transactionInstallment of transactionsInstallments){
      const dayPurchaseInstallment = transactionInstallment.createdAt;
      const monthInstallmentInLoop = parseInt(transactionInstallment.createdAt.split('/')[1]);

      const dayInMonthInLoop = dayjs(`01/${monthActual}/${year}`).format("DD-MM-YYYY");

      const startDate = dayjs(dayPurchaseInstallment, { format: 'DD-MM-YYYY' });
      const endDate = dayjs(dayInMonthInLoop);
      const monthsDiff = endDate.diff(startDate, 'month');

      if(monthInstallmentInLoop !== monthActual && monthActual >= monthInstallmentInLoop  && transactionInstallment.installments && monthsDiff <= transactionInstallment.installments){
        total -= transactionInstallment.value / transactionInstallment.installments
        totalOutcome += transactionInstallment.value / transactionInstallment.installments
      }
    }
  
    return { total, totalIncome, totalOutcome };
  }

  function formatToArrayOfMonthsInYear(transactionsFormatedDayAndTotal: TransactionsFormatedDayAndTotal[]) {
    let monthsArray = [];

    for(let month = 0; month < months.length; month++){
      const transactionMonthAtual = transactionsFormatedDayAndTotal.filter(transaction => parseInt(transaction.date.split('/')[1]) === (month + 1));
      const totalMonth = calcTotalInMonth(transactionMonthAtual, (month + 1));
      
      monthsArray.push({ mês: months[month], saldo: totalMonth.total, entradas: totalMonth.totalIncome, saídas: totalMonth.totalOutcome })
    }

    return monthsArray.filter(month => month.saldo !== 0);
  }

  const arrayTransactions = transactions.filter(transaction =>
    transaction.createdAt.split('/')[2] === String(year)
  ).map(transaction => {
    return { date: transaction.createdAt, total: transaction.value, type: transaction.type, method: transaction.method, installments: transaction.installments }
  });

  return formatToArrayOfMonthsInYear(arrayTransactions)
}