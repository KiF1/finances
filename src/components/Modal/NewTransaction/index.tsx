import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CaretCircleDown, CaretCircleUp, X } from "phosphor-react";
import { addDoc } from "firebase/firestore";
import { ContextApplication } from "../../../context/ContextApplication";
import { Toast } from "../../Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactLoading from "react-loading";
import InputMask from 'react-input-mask';


const newTransactionFormSchema = z.object({
  description: z.string().min(3, { "message": "Insira um descrição válida" }),
  category: z.string().min(3, { "message": "Insira uma categoria válida" }),
  value: z.number().min(3, { "message": "Insira um valor válido" }),
  bank: z.string(),
  method: z.string(),
  installments: z.number().optional(),
  createdAt: z.string(),
  type: z.string(),
  userId: z.string()
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const queryClient = useQueryClient();

  const [installmentsActive, setInstallmentsActive] = useState(false);
  const [incomeActive, setIncomeActive] = useState<undefined | boolean>(undefined);

  const { user, transactionsCollectionRef, banks  } = useContext(ContextApplication);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      userId: user?.uid,
    }
  });

  const valueMethod = watch('method');

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NewTransactionFormInputs) => {
     return await addDoc(transactionsCollectionRef, data);
   },
   onSuccess: () => {
     reset();
     setIncomeActive(undefined);
     toast.success(`Transação realizada com sucesso!`);
     queryClient.invalidateQueries({ queryKey: ["transactions"] });
   },
   onError: () => {
     toast.error('Erro ao realizar transação');
   }
 },
)

  useEffect(() => {
    if(valueMethod !== undefined){
      if(valueMethod.split('_')[0] === 'credit'){
      setInstallmentsActive(true)
      }else{
        setInstallmentsActive(false)
      }
    }
  }, [valueMethod]);

  useEffect(() => {
    if(incomeActive){
      setValue("type", "income")
    }else{
      setValue("type", "outcome")
    }
  }, [incomeActive])

  return (
    <Dialog.Portal>
      <Toast />
      <div className="fixed z-[200] w-full h-full inset-0 bg-black bg-opacity-75">
        <div className="w-[85%] md:w-[35%] p-10 mx-auto bg-gray-800 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md h-[400px]">
          <div className="overflow-y-scroll h-[300px] mt-8 pl-2 pr-8">
            <Dialog.Title className="text-white">Nova Transação</Dialog.Title>
            <Dialog.Close className="absolute top-6 right-6 bg-transparent border-0 cursor-pointer text-gray-600">
              <X size={24} />
            </Dialog.Close>
            <form
              className="mt-8 flex flex-col gap-4"
              onSubmit={handleSubmit((data: NewTransactionFormInputs) => mutate(data))}
            >
              <input
                type="text"
                placeholder="Descrição"
                required
                {...register("description")}
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
              />
              <input
                type="text"
                placeholder="Categoria"
                required
                {...register("category")}
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
              />
              <div>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-white sm:text-sm">R$</span>
                  </div>
                  <input 
                    type="number"  
                    placeholder="0,00" 
                    required
                    {...register("value", { valueAsNumber: true })} 
                    className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white pl-8" />
                </div>
              </div>
              <InputMask
                mask={"99/99/9999"}
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
                alwaysShowMask={false}
                type={'text'}
                placeholder="Data da Transação"
                {...register("createdAt", { required: true })}
              />
              {banks !== undefined && (
                <select {...register("method")} className='w-full bg-gray-700 text-white text-sm p-3 rounded-lg'>
                  <option value="">Escolha o Banco</option>
                  {banks.map(bank => (
                      <option key={bank.id} value={`pix_${bank.bank.toLocaleLowerCase()}`}>{bank.bank}</option>
                  ))}
                </select>
              )}
              {banks !== undefined && (
                <select {...register("method")} className='w-full bg-gray-700 text-white text-sm p-3 rounded-lg'>
                  <option value="">Escolha o Método</option>
                      <option value="pix">Pix</option>
                      <option value="debit">Débito</option>
                      <option value="credit">Crédito</option>
                </select>
              )}
              {installmentsActive && (
                <input
                type="number"
                placeholder="Número de Parcelas"
                required
                {...register("installments", { valueAsNumber: true })}
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <button
                  type="button"
                  data-active={incomeActive}
                  onClick={() => setIncomeActive(true)}
                  className="bg-gray-700 p-4 flex items-center justify-center gap-2 border-0 rounded-lg cursor-pointer text-gray-300 hover:bg-green-700 data-[active=true]:bg-green-700"
                >
                  <CaretCircleUp color="#00B37E" size={24} />
                  Entrada
                </button>
                <button
                  type="button"
                  data-active={incomeActive === false}
                  onClick={() => setIncomeActive(false)}
                  className="bg-gray-700 p-4 flex items-center justify-center gap-2 border-0 rounded-lg cursor-pointer text-gray-300 hover:bg-red-700 data-[active=true]:bg-red-700"
                >
                  <CaretCircleDown color="#F75A68" size={24} />
                  Saída
                </button>
              </div>
              <button
                disabled={isPending}
                type="submit"
                className="w-full mt-6 h-14 bg-gray-700 text-white font-bold px-5 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-200 flex justify-center items-center"
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

