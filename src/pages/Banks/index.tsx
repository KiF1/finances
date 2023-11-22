import { Bank, Calendar, Notepad } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { BankModal } from "../../components/Modal/BankModal";
import { FilterBankModal } from "../../components/Modal/FilterBank";
import { useContext } from "react";
import { ContextApplication } from "../../context/ContextApplication";
import { HistoryBank } from "../../components/HistoryBank";
import { BanksCards } from "../../components/BanksCards";

export function Banks(){
  const { user } = useContext(ContextApplication)

  return(
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex items-center gap-2">
        <Bank color="#ffffff" size={24} />
        <h1 className="text-base font-medium text-white">Cartões - Novembro | 2023</h1>
        <img src={user?.photoURL!} className="w-8 h-8 rounded-full ml-auto" />
      </div>
      <BanksCards />
      <div className="w-full flex flex-col sm:flex-row items-center justify-between sm:justify-start">
        <div className="w-full flex items-center gap-2">
          <Notepad color="#ffffff" size={24} />
          <h1 className="text-base font-medium text-white">Histórico - Novembro | 2023 - Santander</h1>
        </div>
        <div className="w-full mt-4 sm:m-0 sm:w-fit flex justify-end sm:items-center gap-4">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="w-fit h-fit border-0 bg-gray-700 px-4 py-2 rounded-lg cursor-pointer flex justify-center items-center gap-2 hover:opacity-75">
                <Bank className="w-5 h-5" size={20} color="white" />
              </button>
            </Dialog.Trigger>
            <BankModal />
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="w-fit h-fit border-0 bg-gray-700 px-4 py-2 rounded-lg cursor-pointer flex justify-center items-center gap-2 hover:opacity-75">
                <Calendar className="w-5 h-5" size={20} color="white" />
              </button>
            </Dialog.Trigger>
            <FilterBankModal />
          </Dialog.Root>
        </div>
      </div>
      <HistoryBank />
    </div>
  )
}