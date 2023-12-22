import { Trash } from "phosphor-react";
import { Product } from "../../pages/Planning";
import { calculeSaldTotal } from "../../utils/calcule-sald-total";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../lib/firebase";
import toast from "react-hot-toast";
import { Toast } from "../Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactLoading from "react-loading";

interface Props{
  products: Product[]
}

export function Products({ products }: Props){
  const queryClient = useQueryClient();
  const totalSald = calculeSaldTotal();

  const productsMaped = products.map(product => {
    const totalComplete = (totalSald * 100) / product.price
   const percentageComplete = totalComplete >= 0 ? totalComplete : 0;

   return { 
    id: product.id, 
    product: product.product, 
    date: product.createdAt, 
    price: product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 
    percentageComplete 
  }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
     return await deleteDoc(doc(database, "products", id));
   },
   onSuccess: () => {
     toast.success(`Produto deletado com sucesso!`);
     queryClient.invalidateQueries({ queryKey: ["banks"] });
   },
   onError: () => {
     toast.error('Erro ao deletar Produto!');
   }
 },
)

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <Toast />
      {productsMaped.map(product => (
        <div key={product.id} className="w-full bg-gray-700 rounded-lg flex flex-col">
          <div className="w-full flex flex-col gap-4 p-6">
            <strong className="text-3xl font-medium text-white ">{product.product}</strong>
            <strong className="text-lg font-medium text-white">Preço: {product.price}</strong>
            <strong className="text-lg font-medium text-white">Data: {product.date}</strong>
            <div className="w-full bg-gray-600 rounded-full">
              <div 
              style={{ width: product.percentageComplete >= 100 ? '100%' : product.percentageComplete !== 0 ? `${product.percentageComplete}` : '50%' }} 
              className="bg-gray-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">
                {product.percentageComplete >= 100 ? '100%' : `${product.percentageComplete}%`}
              </div>
            </div>
          </div>
          <button onClick={() => mutate(product.id)} className="w-full mt-2 h-14 bg-gray-600 rounded-b-lg text-white font-bold px-5 cursor-pointer hover:opacity-75 transition duration-200 flex justify-center items-center">
            {!isPending ? <Trash size={24} color="white" className="m-auto" /> :  <ReactLoading className="w-fit" type="spinningBubbles" color="#ffffff" height="23px" width="23px"/>}
          </button>
        </div>
      ))}
    </div>
  )
}