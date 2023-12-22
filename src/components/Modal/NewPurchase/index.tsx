import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { X } from "phosphor-react";
import { useContext } from "react";
import { ContextApplication } from "../../../context/ContextApplication";
import { addDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { Toast } from "../../Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactLoading from "react-loading";


const newpurchaseFormSchema = z.object({
  product: z.string().min(3, { "message": "Informe o produto" }),
  price: z.number(),
  createdAt: z.string(),
  userId: z.string()
});

type NewPurchaseFormInputs = z.infer<typeof newpurchaseFormSchema>;

export function NewPurchase(){
  const queryClient = useQueryClient();

  const { user, productsCollectionRef } = useContext(ContextApplication)
  const { register, handleSubmit } = useForm<NewPurchaseFormInputs>({
    resolver: zodResolver(newpurchaseFormSchema),
    defaultValues: {
      userId: user?.uid,
      createdAt: dayjs().format('DD/MM/YYYY'),
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NewPurchaseFormInputs) => {
     return await addDoc(productsCollectionRef, data);
   },
   onSuccess: () => {
     toast.success(`Produto adicionado com sucesso!`);
     queryClient.invalidateQueries({ queryKey: ["products"] });
   },
   onError: () => {
     toast.error('Erro ao adicionar Produto');
   }
 },
)


  return (
    <Dialog.Portal>
      <Toast />
      <div className="fixed z-[200] w-full h-full inset-0 bg-black bg-opacity-75">
        <div className="w-[85%] md:w-[35%] mx-auto p-10 bg-gray-800 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
          <Dialog.Title className="text-white">Adicione o Produto Desejado!</Dialog.Title>
          <Dialog.Close className="absolute top-6 right-6 bg-transparent border-0 cursor-pointer text-gray-600">
            <X size={24} />
          </Dialog.Close>
          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={handleSubmit((data: NewPurchaseFormInputs) => mutate(data))}
          >
            <input
              type="text"
              placeholder="Informe o nome do produto"
              required
              {...register("product")}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
            />
            <input
              type="number"
              placeholder="Informe o preço do produto"
              required
              {...register("price", { valueAsNumber: true }) }
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
            />
            <button
              disabled={isPending}
              type="submit"
              className="w-full mt-6 h-14 bg-gray-700 text-white font-bold px-5 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-200 flex justify-center items-center"
            >
              {!isPending ? 'Cadastrar' : <ReactLoading className="w-fit" type="spinningBubbles" color="#ffffff" height="23px" width="23px"/>}
            </button>
          </form>
        </div>
      </div>
    </Dialog.Portal>
  );
}