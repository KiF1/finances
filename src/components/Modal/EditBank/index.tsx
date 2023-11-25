import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { X } from "phosphor-react";
import { useContext } from "react";
import { ContextApplication } from "../../../context/ContextApplication";
import { doc, updateDoc } from "firebase/firestore";
import { Toast } from "../../Toast";
import { database } from "../../../lib/firebase";

interface Props{
  id: string;
}


const bankFormSchema = z.object({
  limit: z.number().min(3),
  date: z.number().min(3),
});

type BankFormInputs = z.infer<typeof bankFormSchema>;

export function EditBank({ id }: Props){
  const { refetchBanks } = useContext(ContextApplication)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<BankFormInputs>({
    resolver: zodResolver(bankFormSchema),
  });

  async function updateBank(data: BankFormInputs) {
    try {
      const bankDoc = doc(database, "banks", id);
      await updateDoc(bankDoc, data);
      await toast.success(`Os dados foram atualizados sucesso!`)
      await reset();
      await refetchBanks();
    } catch {
      toast.error('Erro ao atualizar os dados!')
    }
  }


  return (
    <Dialog.Portal>
      <Toast />
      <div className="fixed z-[200] w-full h-full inset-0 bg-black bg-opacity-75">
        <div className="w-[85%] md:w-[35%] mx-auto p-10 bg-gray-800 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
          <Dialog.Title className="text-white">Editar Banco</Dialog.Title>
          <Dialog.Close className="absolute top-6 right-6 bg-transparent border-0 cursor-pointer text-gray-600">
            <X size={24} />
          </Dialog.Close>
          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={handleSubmit(updateBank)}
          >
            <input
              type="number"
              placeholder="Informe o limite de crédito"
              required
              {...register("limit", { valueAsNumber: true })}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
            />
            <input
              type="number"
              placeholder="Informe a data de vencimento da fatura"
              required
              {...register("date", { valueAsNumber: true })}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-6 h-14 bg-gray-700 text-white font-bold px-5 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-200"
            >
              Editar
            </button>
          </form>
        </div>
      </div>
    </Dialog.Portal>
  );
}