import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Camera, X } from "phosphor-react";
import { MediaPicker } from "../../MediaPicker";


const bankFormSchema = z.object({
  bank: z.string().min(3, { "message": "Informe um Banco" }),
  limit: z.number().min(3, { "message": "Informe o limite de crédito" })
});

type BankFormInputs = z.infer<typeof bankFormSchema>;

export function BankModal(){
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<BankFormInputs>({
    resolver: zodResolver(bankFormSchema),
  });

  async function handleCreateBank(data: BankFormInputs) {
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
          <Dialog.Title className="text-white">Adicione o Banco</Dialog.Title>
          <Dialog.Close className="absolute top-6 right-6 bg-transparent border-0 cursor-pointer text-gray-600">
            <X size={24} />
          </Dialog.Close>
          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={handleSubmit(handleCreateBank)}
          >
            <label htmlFor="media" className="w-full p-3 rounded-lg bg-gray-700 flex cursor-pointer items-center text-white gap-1.5">
              <Camera className="h-4 w-4" />
              Anexar Mídia
            </label>
            <MediaPicker />
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
              {...register("bank")}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white"
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-6 h-14 bg-gray-700 text-white font-bold px-5 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-200"
            >
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </Dialog.Portal>
  );
}