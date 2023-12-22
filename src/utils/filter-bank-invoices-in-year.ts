import { Transaction } from "../context/ContextApplication";

export interface TransactionsFormatedDayAndTotal{
  date: string;
  total: number;
  type: string;
  method: string;
  bank: string;
  installments: number | undefined;
}

export function FilterBankInvoiceInYear(transactions: Transaction[], year: number, bank: string, dayInvoice: number){
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const transactionsInstallments = transactions.filter(transaction => transaction.method === 'credit');

  function calcTotalInMonth(transactionsFormatedDayAndTotal: TransactionsFormatedDayAndTotal[], monthActual: number) {
    let limitSpent = 0;
    let totalOutcome = 0;

    const invoiceClosingDay = dayInvoice;

    for (let transaction of transactionsFormatedDayAndTotal) {
      const dayActualTransaction = parseInt(transaction.date.split('/')[0])

      if(transaction.method === 'credit' && transaction.installments && dayActualTransaction < invoiceClosingDay && transaction.bank === bank.toLocaleLowerCase()){
        const installmentAmount = transaction.total / transaction.installments;

        limitSpent += transaction.total
        totalOutcome += installmentAmount
      }

    }

    for(let transactionInstallment of transactionsInstallments){
      const monthInstallmentInLoop = parseInt(transactionInstallment.createdAt.split('/')[1]);
      const yearInstallmentInLoop = parseInt(transactionInstallment.createdAt.split('/')[2]);

      const startDate = new Date(new Date(`${yearInstallmentInLoop}/${monthInstallmentInLoop}/01`)) 
      const finalDate = new Date(monthActual >= 10 ? `${year}/${monthActual}/01` : `${year}/0${monthActual}/01`);
      const monthsDiff = (finalDate.getFullYear() - startDate.getFullYear()) * 12 + (finalDate.getMonth() - startDate.getMonth());

      if(monthInstallmentInLoop !== monthActual && transactionInstallment.installments && monthsDiff <= transactionInstallment.installments && monthsDiff > 0 && transactionInstallment.bank === bank.toLocaleLowerCase()){
        limitSpent += transactionInstallment.value
        totalOutcome += transactionInstallment.value / transactionInstallment.installments
      }
    }
  
    return { limitSpent, totalOutcome };
  }

  function formatToArrayOfMonthsInYear(transactionsFormatedDayAndTotal: TransactionsFormatedDayAndTotal[]) {
    let monthsArray = [];

    for(let month = 0; month < months.length; month++){
      const transactionMonthAtual = transactionsFormatedDayAndTotal.filter(transaction => parseInt(transaction.date.split('/')[1]) === (month + 1));
      const totalMonth = calcTotalInMonth(transactionMonthAtual, (month + 1));
      
      monthsArray.push({ mês: months[month], fatura: totalMonth.totalOutcome, limitSpent: totalMonth.limitSpent })
    }

    return monthsArray.filter(month => month.fatura !== 0);
  }

  const arrayTransactions = transactions.map(transaction => {
    return { date: transaction.createdAt, total: transaction.value, type: transaction.type, method: transaction.method, installments: transaction.installments, bank: transaction.bank }
  });

  return formatToArrayOfMonthsInYear(arrayTransactions)
}