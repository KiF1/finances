import { ChartBar, CurrencyDollarSimple, MagnifyingGlass } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../../components/Modal/NewTransaction";
import { FormEvent, useContext, useState } from "react";
import { ContextApplication } from "../../context/ContextApplication";
import { AnnualBalance } from "../../components/AnnualBalance";

export function Home(){
  const [yearSelected, setYearSelected] = useState(2023)
  const { user } = useContext(ContextApplication)

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
      <AnnualBalance year={yearSelected} />
    </div>
  )
}