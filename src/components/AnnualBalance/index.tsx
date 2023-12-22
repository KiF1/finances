import { memo, useContext, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle, AreaChart, Area } from 'recharts';
import { ContextApplication } from '../../context/ContextApplication';
import { calcTotalInYear } from '../../utils/calc-total-in-year';
import { Table } from '../Table';
import { TableMonths } from '../TableMonths';
import { ArrayTransactionsPerMonthInYear } from '../../pages/Home';
import { CustomTooltip } from '../CustomTooltip';
import { CustomTooltipBar } from '../CustomTooltipBar';

interface Props{
  arrayTransactionsPerMonth: ArrayTransactionsPerMonthInYear[]
}

export function AnnualBalanceComponent({ arrayTransactionsPerMonth }: Props){
  const { yearSelected } = useContext(ContextApplication);
  
  const { balanceInTheYear, incomesInTheYear, outcomesInTheYear } = useMemo(() => {
    return calcTotalInYear(arrayTransactionsPerMonth)
  }, [arrayTransactionsPerMonth])
  
  return(
    <div className="w-full flex flex-col gap-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
          <strong className="text-base font-medium text-white">Entradas</strong>
          <strong className="text-4xl font-bold text-white">{incomesInTheYear}</strong>
        </div>
        <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
          <strong className="text-base font-medium text-white">Saídas</strong>
          <strong className="text-4xl font-bold text-white">{outcomesInTheYear}</strong>
        </div>
        <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
          <strong className="text-base font-medium text-white">Saldo</strong>
          <strong className="text-4xl font-bold text-white">{balanceInTheYear}</strong>
        </div>
      </div>
      <div className='w-full flex flex-col gap-8 bg-gray-700 rounded-lg p-8'>
        <strong className="text-xl font-medium text-white">Saldo Meses - {yearSelected}</strong>
        <div className='w-full h-[300px] mt-8'>
          <ResponsiveContainer width="100%" height="100%" >
            <AreaChart width={150} height={40} data={arrayTransactionsPerMonth}>
              <Area type="monotone" stroke="#2A2879" dataKey="saldo" fill="#252D4A" />
              <XAxis dataKey="mês"  />
              <YAxis tickCount={7} tickFormatter={(number) => `R$ ${number}`} />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='w-full flex flex-col gap-8 bg-gray-700 rounded-lg p-8'>
        <strong className="text-xl font-medium text-white">Entradas | Saídas - {yearSelected}</strong>
        <div className='w-full h-[300px] mt-8'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={arrayTransactionsPerMonth}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
            <XAxis dataKey="mês" />
            <YAxis tickCount={7} tickFormatter={(number) => `R$ ${number}`} />
            <Tooltip content={<CustomTooltipBar />} />
            <Legend />
            <Bar dataKey="entradas" fill="#252D4A" activeBar={<Rectangle fill="#252D4A" stroke="blue" />} />
            <Bar dataKey="saídas" fill="#303F73" activeBar={<Rectangle fill="#303F73" stroke="purple" />} />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
      <div className='w-full flex flex-col gap-8 bg-gray-700 rounded-lg p-8'>
        <strong className="text-xl font-medium text-white">Análise Meses - {yearSelected}</strong>
        <div className="w-full overflow-x-scroll lg:overflow-hidden">
          <TableMonths arrayTransactionsPerMonth={arrayTransactionsPerMonth!} />
        </div>
      </div>
      <Table />
    </div>
  )
}

export const AnnualBalance = memo(AnnualBalanceComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.arrayTransactionsPerMonth, nextProps.arrayTransactionsPerMonth)
})