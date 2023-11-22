import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Table } from '../Table';
import { useContext } from 'react';
import { ContextApplication } from '../../context/ContextApplication';

export function HistoryBank(){
  const { transactions } = useContext(ContextApplication);
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  
  return(
    <div className="w-full flex flex-col gap-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-[0.85fr_1fr] gap-8">
          <div className="w-full flex flex-col gap-8">
            <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
              <strong className="text-base font-medium text-white">Limite Disponível</strong>
              <strong className="text-4xl font-bold text-white">R$ 1700,00</strong>
            </div>
            <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
              <strong className="text-base font-medium text-white">Fatura A Pagar</strong>
              <strong className="text-4xl font-bold text-white">R$ 1700,00</strong>
            </div>
          </div>
          <div className='w-full h-[300px] mt-8'>
            <ResponsiveContainer width="100%" height="100%" >
              <BarChart width={150} height={40} data={data}>
                <Bar dataKey="uv" fill="#181C2A" />
                <XAxis dataKey="amt" />
                <YAxis />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full overflow-x-scroll lg:overflow-hidden">
          <Table transactions={transactions} />
        </div>
      </div>
  )
}