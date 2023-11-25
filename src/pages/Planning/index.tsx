import { Calendar, ShoppingBag, ShoppingCart } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { NewPurchase } from "../../components/Modal/NewPurchase";
import { useContext } from "react";
import { ContextApplication } from "../../context/ContextApplication";
import { ReservationPlanning } from "../../components/ReservationPlanning";
import ReactLoading from "react-loading";
import { Products } from "../../components/Products";
import { useQuery } from "@tanstack/react-query";
import { getDocs } from "firebase/firestore";

export interface Product{
  id: string;
  product: string;
  createdAt: string
  userId: string;
  price: number;
}

export function Planning(){
  const { user, fetchTransaction, fetchBank, productsCollectionRef } = useContext(ContextApplication);
  
  const { data: products, isFetching: fetchProducts, refetch: refetchProducts } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await getDocs(productsCollectionRef);
      const filteredData = data.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as Product;
      }).filter(bank => bank.userId === user?.uid);
      return filteredData;
    },
  });
  
  return(
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex items-center gap-2">
        <Calendar color="#ffffff" size={24} />
        <h1 className="text-base font-medium text-white">Planejamento - Reserva</h1>
        <img src={user?.photoURL!} className="w-8 h-8 rounded-full ml-auto" />
      </div>
      {!fetchTransaction && !fetchProducts && !fetchBank ? (
        <>
          <ReservationPlanning />
          <div className="w-full flex flex-col sm:flex-row items-center justify-between sm:justify-start">
            <div className="w-full flex items-center gap-2">
              <ShoppingBag color="#ffffff" size={24} />
              <h1 className="text-base font-medium text-white">Planejamento - Compras</h1>
            </div>
            <div className="w-full mt-4 sm:m-0 sm:w-fit flex justify-end sm:items-center gap-4">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className="w-fit h-fit border-0 bg-gray-700 px-4 py-2 rounded-lg cursor-pointer flex justify-center items-center gap-2 hover:opacity-75">
                    <ShoppingCart className="w-5 h-5" size={20} color="white" />
                  </button>
                </Dialog.Trigger>
                <NewPurchase refetchProducts={refetchProducts} />
              </Dialog.Root>
            </div>
          </div>
          <Products products={products!} refetchProducts={refetchProducts} />
        </>
      ) : (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <ReactLoading
            className="w-fit"
            type="spinningBubbles"
            color="#181C2A"
            height="80px"
            width="100px"
          />
        </div>
      )}
    </div>
  )
}