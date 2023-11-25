import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CaretCircleDown, CaretCircleUp, X } from "phosphor-react";
import { addDoc } from "firebase/firestore";
import { ContextApplication } from "../../../context/ContextApplication";
import dayjs from 'dayjs';
import { Toast } from "../../Toast";


const newTransactionFormSchema = z.object({
  description: z.string().min(3, { "message": "Insira um descrição válida" }),
  category: z.string().min(3, { "message": "Insira uma categoria válida" }),
  value: z.number().min(3, { "message": "Insira um valor válido" }),
  method: z.string(),
  installments: z.number().optional(),
  createdAt: z.string(),
  type: z.string(),
  userId: z.string()
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const [installmentsActive, setInstallmentsActive] = useState(false);
  const [incomeActive, setIncomeActive] = useState(false);
  const [outcomeActive, setOutcomeActive] = useState(false);

  const { user, refetchTransactions, transactionsCollectionRef, banks  } = useContext(ContextApplication)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      userId: user?.uid,
      createdAt: dayjs().format('DD/MM/YYYY'),
    }
  });

  const valueMethod = watch('method');

  function activeTypeTransaction(typeButton: string) {
    if (typeButton === "income") {
      setIncomeActive(true);
      setValue('type', 'income');
      setOutcomeActive(false);
    } else {
      setOutcomeActive(true);
      setValue('type', 'outcome');
      setIncomeActive(false);
    }
  }

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    try {
      const valueTransaction = data.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      await addDoc(transactionsCollectionRef, data);
      await refetchTransactions();
      if(incomeActive){
        toast.success(`Transação realizada com sucesso, foi adicionado ${valueTransaction} em sua conta!`)
      }else{
        toast.success(`Transação realizada com sucesso, você retirou ${valueTransaction} da sua conta!`)
      }
      reset();
    } catch {
      toast.error('Erro ao realizar transação')
    }
  }

  useEffect(() => {
    if(valueMethod !== undefined){
      if(valueMethod.split('_')[0] === 'credit'){
      setInstallmentsActive(true)
      }else{
        setInstallmentsActive(false)
      }
    }
  }, [valueMethod])

  return (
    <Dialog.Portal>
      <Toast />
      <div className="fixed z-[200] w-full h-full inset-0 bg-black bg-opacity-75">
        <div className="w-[85%] md:w-[35%] mx-auto p-10 bg-gray-800 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
          <Dialog.Title className="text-white">Nova Transação</Dialog.Title>
          <Dialog.Close className="absolute top-6 right-6 bg-transparent border-0 cursor-pointer text-gray-600">
            <X size={24} />
          </Dialog.Close>
          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={handleSubmit(handleCreateNewTransaction)}
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
            <input
              type="number"
              placeholder="Valor"
              required
              {...register("value", { valueAsNumber: true })}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
            />
            {banks !== undefined && (
              <select {...register("method")} className='w-full bg-gray-700 text-white text-sm p-3 rounded-lg'>
                <option value="">Escolha o Método</option>
                {banks.map(bank => (
                  <>
                    <option value={`pix_${bank.bank}`}>Pix - {bank.bank}</option>
                    <option value={`debit_${bank.bank}`}>Débito - {bank.bank}</option>
                    <option value={`credit_${bank.bank}`}>Crédito - {bank.bank}</option>
                  </>
                ))}
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
                onClick={() => activeTypeTransaction("income")}
                className="bg-gray-700 p-4 flex items-center justify-center gap-2 border-0 rounded-lg cursor-pointer text-gray-300 hover:bg-green-700 data-[active=true]:bg-green-700"
              >
                <CaretCircleUp color="#00B37E" size={24} />
                Entrada
              </button>
              <button
                type="button"
                data-active={outcomeActive}
                onClick={() => activeTypeTransaction("outcome")}
                className="bg-gray-700 p-4 flex items-center justify-center gap-2 border-0 rounded-lg cursor-pointer text-gray-300 hover:bg-red-700 data-[active=true]:bg-red-700"
              >
                <CaretCircleDown color="#F75A68" size={24} />
                Saída
              </button>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-6 h-14 bg-gray-700 text-white font-bold px-5 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-200"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </Dialog.Portal>
  );
}

