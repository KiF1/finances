import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { useContext, useState } from "react";
import { ContextApplication } from "../../../context/ContextApplication";

export function FilterBankModal() {
  const [bankSelectedToFilter, setBankSelectedToFilter] = useState('');
  const [yearSelectedToFilter, setYearSelectedToFilter] = useState(2023);

  const { setBankSelected, setYearSelectedFilterBank, banks } = useContext(ContextApplication);

  function filterBank(){
    setBankSelected(bankSelectedToFilter);
    setYearSelectedFilterBank(yearSelectedToFilter);
  }

  return (
    <Dialog.Portal>
      <div className="fixed z-[200] w-full h-full inset-0 bg-black bg-opacity-75">
        <div className="w-[85%] md:w-[35%] mx-auto p-10 bg-gray-800 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
          <Dialog.Title className="text-white">Selecione os campos para filtragem</Dialog.Title>
          <Dialog.Close className="absolute top-6 right-6 bg-transparent border-0 cursor-pointer text-gray-600">
            <X size={24} />
          </Dialog.Close>
          <div
            className="mt-8 flex flex-col gap-4"
          >
            <input
              type="number"
              placeholder="Selecione o Ano"
              onChange={(e) => setYearSelectedToFilter(Number(e.target.value))}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
            />
            <select onChange={(e) => setBankSelectedToFilter(e.target.value)} className='w-full bg-gray-700 text-white text-sm p-3 rounded-lg'>
                <option value="">Escolha o Banco</option>
                {banks!.map(bank => (
                  <option value={bank.bank}>{bank.bank}</option>
                ))}
            </select>
            <button
              type="button"
              onClick={() => filterBank()}
              className="w-full mt-6 h-14 bg-gray-700 text-white font-bold px-5 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-200"
            >
              Filtrar
            </button>
          </div>
        </div>
      </div>
    </Dialog.Portal>
  );
}