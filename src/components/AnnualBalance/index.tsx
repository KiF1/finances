import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { ContextApplication } from '../../context/ContextApplication';
import { calcTotalInYear } from '../../utils/calc-total-in-year';
import { filterTransactionsByYear } from '../../utils/filter-transactions-by-year';
import { Table } from '../Table';

interface Props{
  year: number;
}

export function AnnualBalance({ year }: Props){
  const { transactions } = useContext(ContextApplication);
  const { total, totalIncome, totalOutcome } = calcTotalInYear(transactions !== undefined ? transactions : [])

  const transactionInYearSelected = transactions?.filter(transaction => parseInt(transaction.createdAt.split('/')[2]) === year)
  
  return(
    <>
      {transactions !== undefined && (
        <div className="w-full flex flex-col gap-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
              <strong className="text-base font-medium text-white">Entradas</strong>
              <strong className="text-4xl font-bold text-white">{totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
            </div>
            <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
              <strong className="text-base font-medium text-white">Saída</strong>
              <strong className="text-4xl font-bold text-white">{totalOutcome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
            </div>
            <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
              <strong className="text-base font-medium text-white">Saldo</strong>
              <strong className="text-4xl font-bold text-white">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
            </div>
          </div>
          <div className='w-full flex flex-col gap-8 bg-gray-700 rounded-lg p-8'>
            <strong className="text-xl font-medium text-white">Saldo Meses - {year}</strong>
            <div className='w-full h-[300px] mt-8'>
              <ResponsiveContainer width="100%" height="100%" >
                <BarChart width={150} height={40} data={filterTransactionsByYear(transactions, year)}>
                  <Bar dataKey="saldo" fill="#252D4A" />
                  <XAxis dataKey="mês" />
                  <YAxis />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className='w-full flex flex-col gap-8 bg-gray-700 rounded-lg p-8'>
            <strong className="text-xl font-medium text-white">Entradas | Saídas - {year}</strong>
            <div className='w-full h-[300px] mt-8'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={500} height={300} data={filterTransactionsByYear(transactions, year)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mês" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entradas" fill="#252D4A" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="saídas" fill="#303F73" activeBar={<Rectangle fill="gold" stroke="purple" />} />
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>
          <div className="w-full overflow-x-scroll lg:overflow-hidden">
            <Table transactions={transactionInYearSelected!} />
          </div>
        </div>
      )}
    </>
  )
}