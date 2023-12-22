import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { X } from "phosphor-react";
import { useContext } from "react";
import { ContextApplication } from "../../../context/ContextApplication";
import dayjs from "dayjs";
import { addDoc } from "firebase/firestore";
import { Toast } from "../../Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactLoading from "react-loading";


const bankFormSchema = z.object({
  bank: z.string().min(3),
  limit: z.number().min(3),
  date: z.number().min(3),
  createdAt: z.string(),
  userId: z.string()
});

type BankFormInputs = z.infer<typeof bankFormSchema>;

export function BankModal(){
  const { user, banksCollectionRef } = useContext(ContextApplication);
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<BankFormInputs>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      userId: user?.uid,
      createdAt: dayjs().format('DD/MM/YYYY'),
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: BankFormInputs) => {
     return await addDoc(banksCollectionRef, data);;
   },
   onSuccess: () => {
     toast.success(`O banco foi cadastrado com sucesso!`);
     queryClient.invalidateQueries({ queryKey: ["banks"] });
   },
   onError: () => {
     toast.error('Erro ao realizar cadastro do banco!');
   }
 }
)


  return (
    <Dialog.Portal>
      <Toast />
      <div className="fixed z-[200] w-full h-full inset-0 bg-black bg-opacity-75">
        <div className="w-[85%] md:w-[35%] p-10 mx-auto bg-gray-800 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md h-[400px]">
          <div className="overflow-y-scroll h-[300px] mt-8 pr-4">
            <Dialog.Title className="text-white">Adicione o Banco</Dialog.Title>
            <Dialog.Close className="absolute top-6 right-6 bg-transparent border-0 cursor-pointer text-gray-600">
              <X size={24} />
            </Dialog.Close>
            <form
              className="mt-8 flex flex-col gap-4"
              onSubmit={handleSubmit((data: BankFormInputs) => mutate(data))}
            >
              <input
                type="text"
                placeholder="Informe o nome da instituição"
                required
                {...register("bank")}
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
              />
              <input
                type="text"
                placeholder="Informe o limite de crédito"
                required
                {...register("limit", { valueAsNumber: true })}
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
              />
              <input
                type="text"
                placeholder="Informe a data de vencimento da fatura"
                required
                {...register("date", { valueAsNumber: true })}
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
              />
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full mt-6 h-14 bg-gray-700 text-white font-bold px-5 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-200 flex items-center justify-center"
              >
                {!isPending ? 'Adicionar' : <ReactLoading className="w-fit" type="spinningBubbles" color="#ffffff" height="23px" width="23px"/>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Dialog.Portal>
  );
}