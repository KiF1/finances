import * as Dialog from "@radix-ui/react-dialog";
import { Pencil, Trash } from 'phosphor-react';
import { useContext } from "react";
import { ContextApplication } from "../../context/ContextApplication";
import { database } from '../../lib/firebase';
import { deleteDoc, doc } from "firebase/firestore";
import { Toast } from "../Toast";
import toast from "react-hot-toast";
import { EditBank } from "../Modal/EditBank";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactLoading from "react-loading";

export function BanksCards(){
  const { banks } = useContext(ContextApplication);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
       mutationFn: async (id: string) => {
        return await deleteDoc(doc(database, "banks", id));
      },
      onSuccess: () => {
        toast.success(`Banco deletado com sucesso!`);
        queryClient.invalidateQueries({ queryKey: ["banks"] });
      },
      onError: () => {
        toast.error('Erro ao deletar banco!');
      }
    },
  )
  
  return(
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Toast />
      {banks!.map(bank => (
        <div key={bank.id} className="w-full bg-gray-700 rounded-lg flex flex-col gap-4">
          <strong className="text-3xl font-medium px-4 text-white mt-4">{bank.bank}</strong>
          <strong className="text-lg font-medium px-4 text-white">Limite: {bank.limit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
          <strong className="text-lg font-medium px-4 text-white">Limite Disponivel: {bank.limit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
          <strong className="text-lg font-medium px-4 text-white">Dia Vencimento Fatura: {bank.date >= 10 ? bank.date : `0${bank.date}`}</strong>
          <div className="w-full grid grid-cols-2">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="w-full mt-2 h-14 rounded-bl-lg bg-gray-600 text-white font-bold px-5 cursor-pointer hover:opacity-75 transition duration-200">
                  <Pencil size={24} color="white" className="m-auto" />
                </button>
              </Dialog.Trigger>
              <EditBank id={bank.id} />
            </Dialog.Root>
            <button onClick={() => mutate(bank.id)} className="w-full mt-2 h-14 bg-gray-600 rounded-br-lg text-white font-bold px-5 cursor-pointer hover:opacity-75 transition duration-200 flex justify-center items-center">
              {!isPending ? <Trash size={24} color="white" className="m-auto" /> :  <ReactLoading className="w-fit" type="spinningBubbles" color="#ffffff" height="23px" width="23px"/>}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}