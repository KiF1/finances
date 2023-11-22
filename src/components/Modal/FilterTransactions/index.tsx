import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { X } from "phosphor-react";


const filterTransactionsFormSchema = z.object({
  month: z.string(),
  method: z.string(),
});

type FilterTransactionsFormInputs = z.infer<typeof filterTransactionsFormSchema>;

export function FilterTransactionsModal() {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FilterTransactionsFormInputs>({
    resolver: zodResolver(filterTransactionsFormSchema),
  });

  async function handleCreateFilterTransactions(data: FilterTransactionsFormInputs) {
    try {
      reset();
    } catch {
      toast.error('Erro ao realizar transação')
    }
  }


  return (
    <Dialog.Portal>
      <Toaster position="top-right" reverseOrder={true} toastOptions={{
        duration: 5000,
        style: {
          padding: '12px 16px',
          borderRadius: '16px'
        },
        success: {
          style: {
            backgroundColor: '#323238',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '500'
          }
        },
        error: {
          style: {
            backgroundColor: '#323238',
            color: '#AB222E',
            fontSize: '16px',
            fontWeight: '500'
          }
        }
      }} />
      <div className="fixed z-[200] w-full h-full inset-0 bg-black bg-opacity-75">
        <div className="w-[85%] md:w-[35%] mx-auto p-10 bg-gray-800 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
          <Dialog.Title className="text-white">Selecione os campos para filtragem</Dialog.Title>
          <Dialog.Close className="absolute top-6 right-6 bg-transparent border-0 cursor-pointer text-gray-600">
            <X size={24} />
          </Dialog.Close>
          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={handleSubmit(handleCreateFilterTransactions)}
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className='w-full bg-gray-700 text-white text-sm p-3 rounded-lg'>
                  <option value="">Escolha o mês</option>
              </select>
              <select className='w-full bg-gray-700 text-white text-sm p-3 rounded-lg'>
                  <option value="">Escolha o Método</option>
                  <option value="pix">Pix</option>
                  <option value="debit_nubank">Débito - Nubank</option>
                  <option value="credit_nubank">Crédito - Nubank</option>
                  <option value="debit_santander">Débito -  Santander</option>
                  <option value="credit_santander">Crédito - Santander</option>
                  <option value="debit_will">Débito - Will</option>
                  <option value="credit_will">Crédito - Will</option>
              </select>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-6 h-14 bg-gray-700 text-white font-bold px-5 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-200"
            >
              Filtrar
            </button>
          </form>
        </div>
      </div>
    </Dialog.Portal>
  );
}