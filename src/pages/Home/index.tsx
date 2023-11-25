import { ChartBar, CurrencyDollarSimple } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../../components/Modal/NewTransaction";
import ReactLoading from "react-loading";
import { useContext, useEffect, useState } from "react";
import { ContextApplication } from "../../context/ContextApplication";
import { AnnualBalance } from "../../components/AnnualBalance";
import { filterTransactionsByYear } from "../../utils/filter-transactions-by-year";

interface ArrayTransactionsPerMonthInYear{
    mês: string;
    saldo: number;
    entradas: number;
    saídas: number;
}

export function Home(){
  const { user, fetchTransaction, fetchBank, banks, yearSelected, setYearSelected, transactions } = useContext(ContextApplication)
  const [arrayTransactionsPerMonth, setArrayTransactionsPerMonth] = useState<ArrayTransactionsPerMonthInYear[] | []>([]);

  useEffect(() => {
    if(transactions !== undefined && banks !== undefined){
      setArrayTransactionsPerMonth(filterTransactionsByYear(transactions, banks, yearSelected))
    }
  }, [transactions])

  return(
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex items-center gap-2">
        <ChartBar color="#ffffff" size={24} />
        <h1 className="text-base font-medium text-white">Dashboard</h1>
        {user?.photoURL !== null && <img src={user?.photoURL} className="w-8 h-8 rounded-full ml-auto" />}
      </div>
      <div className="w-full mt-6 sm:m-0 sm:w-fit flex justify-start sm:items-center gap-4">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="w-fit h-fit border-0 bg-gray-700 px-4 py-2 rounded-lg cursor-pointer flex justify-center items-center gap-2 hover:bg-gray-600">
              <CurrencyDollarSimple className="w-5 h-5" size={20} color="white" />
            </button>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
          <input
            type="text"
            value={yearSelected}
            onChange={(e) => setYearSelected(parseInt(e.target.value))}
            className="w-[70px] px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-white"
          />
      </div>
      {!fetchTransaction && !fetchBank && arrayTransactionsPerMonth!.length >= 1 ? (
        <AnnualBalance />
      ) : !fetchTransaction && !fetchBank && arrayTransactionsPerMonth!.length === 0 ? (
        <strong className="text-xl font-medium text-white">Cadastre um banco e realize transações para poder ter acesso as informações!</strong>
      ) : (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <ReactLoading
            className="w-fit"
            type="spinningBubbles"
            color="#181C2A"
            height="80px"
            width="100px"
          />
        </div>
      )}
    </div>
  )
}