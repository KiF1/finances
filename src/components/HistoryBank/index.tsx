import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ContextApplication } from '../../context/ContextApplication';
import { FilterBankInvoiceInYear } from '../../utils/filter-bank-invoices-in-year';
import { CustomTooltip } from '../CustomTooltip';
import { TableMui } from '../TableMui';

interface BankDadsMonth{
  mês: string;
  fatura: number;
  limitSpent: number;
}

export function HistoryBank(){
  const [bankSelectedTransactions, setBankSelectedTransactions] = useState<BankDadsMonth[] | [] | undefined>(undefined);
  const [availableLimit, setAvailableLimit] = useState<string | undefined>(undefined)
  const [invoiceForTheCurrentMonth, setInvoiceForTheCurrentMonth] = useState<string | undefined>(undefined)

  const { transactions, banks,  bankSelected, yearSelectedFilterBank } = useContext(ContextApplication);

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const currentDate = new Date();
  const currentMonthName = months[currentDate.getMonth()];

  const arrayTransactionsCallback = useCallback(async () => {
    const bankSelectedToFilter = await banks?.find(bank => bank.bank.toLocaleLowerCase() === bankSelected);
    if(bankSelectedToFilter) {
      const bankDads = await FilterBankInvoiceInYear(transactions!, yearSelectedFilterBank, bankSelectedToFilter.bank, bankSelectedToFilter.date);
      setBankSelectedTransactions(bankDads);

      const invoiceInMonth = await bankDads?.find(data => data.mês === currentMonthName);
      if(invoiceInMonth){
        const limitBank = bankSelectedToFilter.limit;
        const limitSpent = invoiceInMonth.limitSpent;

        const totalLimitAvailable = (limitBank - limitSpent).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        setAvailableLimit(totalLimitAvailable);

        setInvoiceForTheCurrentMonth(invoiceInMonth.fatura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
      }else{
        setAvailableLimit(undefined);
        setInvoiceForTheCurrentMonth(undefined);
      }
    }
}, [transactions, banks, bankSelected, yearSelectedFilterBank]);

useEffect(() => {
  if(transactions !== undefined && banks !== undefined && bankSelected !== undefined) arrayTransactionsCallback()
}, [arrayTransactionsCallback]);


  return(
    <div className="w-full flex flex-col gap-4">
        {availableLimit && invoiceForTheCurrentMonth ? (
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-[0.85fr_1fr] gap-8">
              <div className="w-full flex flex-col gap-8">
                <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
                  <strong className="text-base font-medium text-white">Limite Disponível</strong>
                  <strong className="text-4xl font-bold text-white">{availableLimit}</strong>
                </div>
                <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
                  <strong className="text-base font-medium text-white">Fatura atual</strong>
                  <strong className="text-4xl font-bold text-white">{invoiceForTheCurrentMonth}</strong>
                </div>
              </div>
              <div className='w-full h-[300px] mt-8'>
                <ResponsiveContainer width="100%" height="100%" >
                  <AreaChart width={150} height={40} data={bankSelectedTransactions}>
                    <Area dataKey="fatura" fill="#181C2A" />
                    <XAxis dataKey="mês"  />
                    <YAxis tickCount={7} tickFormatter={(number) => `R$ ${number}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid opacity={0.1} vertical={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <TableMui />
          </>
      ) : (
        <strong className="text-xl font-medium text-white">Selecione um banco com transações realizadas para vizualizar os dados!</strong>
      )}
    </div>
  )
}