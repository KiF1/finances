import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { X } from "phosphor-react";
import { doc, updateDoc } from "firebase/firestore";
import { Toast } from "../../Toast";
import { database } from "../../../lib/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactLoading from "react-loading";

interface Props{
  id: string;
}


const bankFormSchema = z.object({
  limit: z.number().min(3),
  date: z.number().min(3),
});

type BankFormInputs = z.infer<typeof bankFormSchema>;

export function EditBank({ id }: Props){
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<BankFormInputs>({
    resolver: zodResolver(bankFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: BankFormInputs) => {
     const bankDocReference = doc(database, "banks", id);
     return await updateDoc(bankDocReference, data);;
   },
   onSuccess: () => {
     toast.success(`Os dados foram atualizados sucesso!`);
     reset();
     queryClient.invalidateQueries({ queryKey: ["banks"] });
   },
   onError: () => {
     toast.error('Erro ao atualizar os dados!');
   }
 },
)


  return (
    <Dialog.Portal>
      <Toast />
      <div className="fixed z-[200] w-full h-full inset-0 bg-black bg-opacity-75">
        <div className="w-[85%] md:w-[65%] lg:w-[35%] mx-auto p-10 bg-gray-800 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
          <Dialog.Title className="text-white">Editar Banco</Dialog.Title>
          <Dialog.Close className="absolute top-6 right-6 bg-transparent border-0 cursor-pointer text-gray-600">
            <X size={24} />
          </Dialog.Close>
          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={handleSubmit((data: BankFormInputs) => mutate(data))}
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
              disabled={isPending}
              type="submit"
              className="w-full mt-6 h-14 bg-gray-700 text-white font-bold px-5 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-200 flex justify-center items-center"
            >
              {!isPending ? 'Editar' : <ReactLoading className="w-fit" type="spinningBubbles" color="#ffffff" height="23px" width="23px"/>}
            </button>
          </form>
        </div>
      </div>
    </Dialog.Portal>
  );
}