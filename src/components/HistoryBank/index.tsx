import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useContext, useEffect } from 'react';
import { ContextApplication } from '../../context/ContextApplication';
import { FilterBankInvoiceInYear } from '../../utils/filter-bank-invoices-in-year';
import { TableBank } from '../TableBank';

export function HistoryBank(){
  const { transactions, banks,  bankSelected, yearSelectedFilterBank } = useContext(ContextApplication);

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthName = months[currentDate.getMonth()];

  const bankSelectedToFilter = banks!.find(bank => bank.bank.toLocaleLowerCase() === bankSelected?.toLocaleLowerCase());
  const arrayBankSelected = bankSelectedToFilter ? FilterBankInvoiceInYear(transactions!, yearSelectedFilterBank, bankSelectedToFilter.bank, bankSelectedToFilter.date) : undefined 
  const limitAndFatureMonthActual = arrayBankSelected?.find(data => data.mês === currentMonthName);
  const limitInMonthActual = bankSelectedToFilter !== undefined && limitAndFatureMonthActual !== undefined ? (bankSelectedToFilter?.limit - limitAndFatureMonthActual?.limitSpent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 0

  useEffect(() => {
    if(bankSelectedToFilter){
      FilterBankInvoiceInYear(transactions!, yearSelectedFilterBank, bankSelectedToFilter.bank, bankSelectedToFilter.date)
    }
  }, [bankSelected, yearSelectedFilterBank]);

  return(
    <div className="w-full flex flex-col gap-4">
        {arrayBankSelected ? (
          <>
            {limitAndFatureMonthActual !== undefined && currentYear === yearSelectedFilterBank ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-[0.85fr_1fr] gap-8">
                <div className="w-full flex flex-col gap-8">
                  <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
                    <strong className="text-base font-medium text-white">Limite Disponível</strong>
                    <strong className="text-4xl font-bold text-white">{limitInMonthActual}</strong>
                  </div>
                  <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
                    <strong className="text-base font-medium text-white">Fatura atual</strong>
                    <strong className="text-4xl font-bold text-white">{limitAndFatureMonthActual.fatura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                  </div>
                </div>
                <div className='w-full h-[300px] mt-8'>
                  <ResponsiveContainer width="100%" height="100%" >
                    <BarChart width={150} height={40} data={arrayBankSelected}>
                      <Bar dataKey="fatura" fill="#181C2A" />
                      <XAxis dataKey="mês" />
                      <YAxis />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className='w-full h-[300px] mt-8'>
                <ResponsiveContainer width="100%" height="100%" >
                  <BarChart width={150} height={40} data={arrayBankSelected}>
                    <Bar dataKey="fatura" fill="#181C2A" />
                    <XAxis dataKey="mês" />
                    <YAxis />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            <TableBank />
          </>
      ) : (
        <strong className="text-xl font-medium text-white">Selecione Um Banco com transações realizadas!</strong>
      )}
    </div>
  )
}