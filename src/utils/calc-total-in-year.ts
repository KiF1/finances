import { ArrayTransactionsPerMonthInYear } from "../pages/Home";
export interface TransactionsFormatedTotal{
  total: number;
  type: string;
}
export function calcTotalInYear(arrayTransactionsPerMonth: ArrayTransactionsPerMonthInYear[]){

  let balanceInTheYear = 0;
  let incomesInTheYear = 0;
  let outcomesInTheYear = 0;

  for(let month of arrayTransactionsPerMonth){
    balanceInTheYear += month.saldo
    incomesInTheYear += month.entradas
    outcomesInTheYear += month.saídas
  }

  return { 
    balanceInTheYear: balanceInTheYear.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 
    incomesInTheYear: incomesInTheYear.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 
    outcomesInTheYear: outcomesInTheYear.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
  };
}