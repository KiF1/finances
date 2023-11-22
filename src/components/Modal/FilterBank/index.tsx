import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { X } from "phosphor-react";


const filterBankFormSchema = z.object({
  month: z.string(),
  method: z.string(),
});

type FilterBankFormInputs = z.infer<typeof filterBankFormSchema>;

export function FilterBankModal() {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FilterBankFormInputs>({
    resolver: zodResolver(filterBankFormSchema),
  });

  async function handleCreateFilterBank(data: FilterBankFormInputs) {
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
            onSubmit={handleSubmit(handleCreateFilterBank)}
          >
            <select className='w-full bg-gray-700 text-white text-sm p-3 rounded-lg'>
                <option value="">Escolha o Mês</option>
            </select>
            <select className='w-full bg-gray-700 text-white text-sm p-3 rounded-lg'>
                <option value="">Escolha o Banco</option>
                <option value="nubank">Nubank</option>
                <option value="santander"> Santander</option>
                <option value="will">Will</option>
            </select>
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