import { useContext } from "react";
import { ContextApplication } from "../context/ContextApplication";

export function calculeSaldTotal(){
  const { transactions } = useContext(ContextApplication);

  let totalSald = 0;

  for(let transaction of transactions!){
    if(transaction.type === 'income'){
      totalSald += transaction.value
    }else{
      totalSald -= transaction.value
    }
  }

  return totalSald
}