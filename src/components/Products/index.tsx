import { Trash } from "phosphor-react";
import { Product } from "../../pages/Planning";
import { calculeSaldTotal } from "../../utils/calcule-sald-total";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../lib/firebase";
import toast from "react-hot-toast";
import { Toast } from "../Toast";

interface Props{
  products: Product[]
  refetchProducts: () => void;
}

export function Products({ products, refetchProducts }: Props){
  const totalSald = calculeSaldTotal();
  const productsMaped = products.map(product => {
   const percentageComplete = (totalSald * 100) / product.price;

   return { id: product.id, product: product.product, date: product.createdAt, price: product.price, percentageComplete }
  })

  async function deleteProduct(id: string){
    try {
      const bankDoc = doc(database, "products", id);
      await deleteDoc(bankDoc);
      await toast.success(`Produto deletado com sucesso!`)
      await refetchProducts();
    } catch (error) {
      toast.error('Produto ao deletar banco!');
    }
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <Toast />
      {productsMaped.map(product => (
        <div key={product.id} className="w-full bg-gray-700 rounded-lg flex flex-col">
          <div className="w-full flex flex-col gap-4 p-6">
            <strong className="text-3xl font-medium text-white ">{product.product}</strong>
            <strong className="text-lg font-medium text-white">Preço: {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
            <strong className="text-lg font-medium text-white">Data: {product.date}</strong>
            <div className="w-full bg-gray-600 rounded-full">
              <div style={{ width: product.percentageComplete >= 100 ? '100%' : `${product.percentageComplete}%` }} className="bg-gray-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">{product.percentageComplete >= 100 ? '100%' : `${product.percentageComplete}%`}</div>
            </div>
          </div>
          <button onClick={() => deleteProduct(product.id)} className="w-full h-14 bg-gray-600 rounded-b-lg text-white font-bold px-5 cursor-pointer hover:opacity-75 transition duration-200">
            <Trash size={24} color="white" className="m-auto" />
          </button>
        </div>
      ))}
    </div>
  )
}