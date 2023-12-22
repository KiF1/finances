import { Bank, Transaction } from "../context/ContextApplication";

export interface TransactionsFormatedDayAndTotal{
  date: string;
  total: number;
  type: string;
  method: string;
  bank: string;
  installments: number | undefined;
}

export function filterTransactionsByYear(transactions: Transaction[], banks: Bank[], yearSelected: number){
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const transactionsInstallments = transactions.filter(transaction => transaction.method === 'credit');

  function calcTotalInMonth(transactionsFormatedDayAndTotal: TransactionsFormatedDayAndTotal[], monthActual: number) {
    let total = 0;
    let totalIncome = 0;
    let totalOutcome = 0;
    
    for (let transaction of transactionsFormatedDayAndTotal) {
      const bankTransaction = transaction.bank.toLocaleLowerCase();
      const dateBank = banks!.find(bank => bank.bank.toLocaleLowerCase() === bankTransaction)!.date;
      
      const invoiceClosingDay = dateBank;
      const dayActualTransaction = parseInt(transaction.date.split('/')[0])
      const methodPayment = transaction.method

      if(transaction.type === 'income'){
        total += transaction.total;
        totalIncome += transaction.total;
      }else if(methodPayment === 'credit' && transaction.installments && dayActualTransaction < invoiceClosingDay){
        const installmentAmount = transaction.total / transaction.installments;
        total -= installmentAmount
        totalOutcome += installmentAmount
      }else if(methodPayment === 'debit' || methodPayment === 'pix'){
        total -= transaction.total
        totalOutcome += transaction.total
      }

    }

    for(let transactionInstallment of transactionsInstallments!){
      const monthInstallmentInLoop = parseInt(transactionInstallment.createdAt.split('/')[1]);
      const yearInstallmentInLoop = parseInt(transactionInstallment.createdAt.split('/')[2]);

      const startDate = new Date(new Date(`${yearInstallmentInLoop}/${monthInstallmentInLoop}/01`)) 
      const finalDate = new Date(monthActual >= 10 ? `${yearSelected}/${monthActual}/01` : `${yearSelected}/0${monthActual}/01`);
      const monthsDiff = (finalDate.getFullYear() - startDate.getFullYear()) * 12 + (finalDate.getMonth() - startDate.getMonth());

      if(monthInstallmentInLoop !== monthActual && transactionInstallment.installments && monthsDiff <= transactionInstallment.installments && monthsDiff > 0){
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

  const arrayTransactions = transactions.map(transaction => {
    return { date: transaction.createdAt, total: transaction.value, type: transaction.type, method: transaction.method, installments: transaction.installments, bank: transaction.bank }
  });

  return formatToArrayOfMonthsInYear(arrayTransactions!)
}