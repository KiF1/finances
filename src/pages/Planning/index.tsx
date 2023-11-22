import { Calendar, ShoppingBag, ShoppingCart, Trash } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import Iphone from '../../assets/iphone.jpg'
import { NewPurchase } from "../../components/Modal/NewPurchase";
import { useContext } from "react";
import { ContextApplication } from "../../context/ContextApplication";
import { ReservationPlanning } from "../../components/ReservationPlanning";

export function Planning(){
  const { user } = useContext(ContextApplication)
  
  return(
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex items-center gap-2">
        <Calendar color="#ffffff" size={24} />
        <h1 className="text-base font-medium text-white">Planejamento - Reserva</h1>
        <img src={user?.photoURL!} className="w-8 h-8 rounded-full ml-auto" />
      </div>
      <ReservationPlanning />
      <div className="w-full flex flex-col sm:flex-row items-center justify-between sm:justify-start">
        <div className="w-full flex items-center gap-2">
          <ShoppingBag color="#ffffff" size={24} />
          <h1 className="text-base font-medium text-white">Planejamento - Compras</h1>
        </div>
        <div className="w-full mt-4 sm:m-0 sm:w-fit flex justify-end sm:items-center gap-4">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="w-fit h-fit border-0 bg-gray-700 px-4 py-2 rounded-lg cursor-pointer flex justify-center items-center gap-2 hover:opacity-75">
                <ShoppingCart className="w-5 h-5" size={20} color="white" />
              </button>
            </Dialog.Trigger>
            <NewPurchase />
          </Dialog.Root>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="w-full bg-gray-700 rounded-lg flex flex-col">
          <img src={Iphone} className="w-full h-fit md:h-[200px] object-cover rounded-t-lg" />
          <div className="w-full flex flex-col gap-4 p-6">
            <strong className="text-lg font-medium text-white">Iphone 15</strong>
            <strong className="text-lg font-medium text-white">Preço: R$ 10000,00</strong>
            <div className="w-full bg-gray-600 rounded-full">
              <div style={{ width: '45%' }} className="bg-gray-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">45%</div>
            </div>
          </div>
          <button className="w-full h-14 bg-gray-600 rounded-b-lg text-white font-bold px-5 cursor-pointer hover:opacity-75 transition duration-200">
            <Trash size={24} color="white" className="m-auto" />
          </button>
        </div>
      </div>
    </div>
  )
}