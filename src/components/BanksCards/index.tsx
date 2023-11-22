import SantanderLogo from '../../assets/santander.png'
import NubankLogo from '../../assets/nubank.png'
import WillLogo from '../../assets/will.png'
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil, Trash } from 'phosphor-react';
import { BankModal } from '../Modal/BankModal';

export function BanksCards(){
  return(
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="w-full bg-gray-700 rounded-lg flex flex-col">
        <img src={SantanderLogo} className="w-full h-fit md:h-[200px] object-cover rounded-t-lg" />
        <strong className="text-lg font-medium px-4 text-white mt-4">Limite Disponivel: R$ 100,00</strong>
        <strong className="text-lg font-medium px-4 pb-4 text-white">Fatura Atual: R$ 100,00</strong>
        <div className="w-full grid grid-cols-2">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="w-full mt-2 h-14 rounded-bl-lg bg-gray-600 text-white font-bold px-5 cursor-pointer hover:opacity-75 transition duration-200">
                <Pencil size={24} color="white" className="m-auto" />
              </button>
            </Dialog.Trigger>
            <BankModal />
          </Dialog.Root>
          <button className="w-full mt-2 h-14 bg-gray-600 rounded-br-lg text-white font-bold px-5 cursor-pointer hover:opacity-75 transition duration-200">
            <Trash size={24} color="white" className="m-auto" />
          </button>
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-lg flex flex-col">
        <img src={NubankLogo} className="w-full h-fit md:h-[200px] object-cover rounded-t-lg" />
        <strong className="text-lg font-medium px-4 text-white mt-4">Limite Disponivel: R$ 100,00</strong>
        <strong className="text-lg font-medium px-4 pb-4 text-white">Fatura Atual: R$ 100,00</strong>
        <div className="w-full grid grid-cols-2">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="w-full mt-2 h-14 rounded-bl-lg bg-gray-600 text-white font-bold px-5 cursor-pointer hover:opacity-75 transition duration-200">
                <Pencil size={24} color="white" className="m-auto" />
              </button>
            </Dialog.Trigger>
            <BankModal />
          </Dialog.Root>
          <button className="w-full mt-2 h-14 bg-gray-600 rounded-br-lg text-white font-bold px-5 cursor-pointer hover:opacity-75 transition duration-200">
            <Trash size={24} color="white" className="m-auto" />
          </button>
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-lg flex flex-col">
        <img src={WillLogo} className="w-full h-fit md:h-[200px] object-cover rounded-t-lg" />
        <strong className="text-lg font-medium px-4 text-white mt-4">Limite Disponivel: R$ 100,00</strong>
        <strong className="text-lg font-medium px-4 pb-4 text-white">Fatura Atual: R$ 100,00</strong>
        <div className="w-full grid grid-cols-2">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="w-full mt-2 h-14 rounded-bl-lg bg-gray-600 text-white font-bold px-5 cursor-pointer hover:opacity-75 transition duration-200">
                <Pencil size={24} color="white" className="m-auto" />
              </button>
            </Dialog.Trigger>
            <BankModal />
          </Dialog.Root>
          <button className="w-full mt-2 h-14 bg-gray-600 rounded-br-lg text-white font-bold px-5 cursor-pointer hover:opacity-75 transition duration-200">
            <Trash size={24} color="white" className="m-auto" />
          </button>
        </div>
      </div>
    </div>
  )
}