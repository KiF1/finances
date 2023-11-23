import { useContext } from "react";
import { ContextApplication } from "../../context/ContextApplication";

export function Table(){
  const { transactionsInYearSelected, yearSelected } = useContext(ContextApplication);

  return(
    <>
      {transactionsInYearSelected !== undefined && transactionsInYearSelected?.length >= 1 && (
        <div className='w-full flex flex-col gap-8 bg-gray-700 rounded-lg p-8'>
          <strong className="text-xl font-medium text-white">Tranferências - {yearSelected}</strong>
          <div className="w-full overflow-x-scroll lg:overflow-hidden">
            <table className="w-full">
              <tbody>
                <tr className="mt-4 bg-gray-700">
                  <td className="py-5 px-8 text-center border-b-2 border-b-gray-600 rounded-tl-lg text-white font-medium">Descrição da Transação</td>
                  <td className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white font-medium">Valor da Transação</td>
                  <td className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white font-medium">Categoria da Transação</td>
                  <td className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white font-medium">Banco</td>
                  <td className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white font-medium">Método de pagamento</td>
                  <td className="py-5 px-8 text-center border-b-2 border-b-gray-600 rounded-tr-lg text-white font-medium">Data da Transação</td>
                </tr>
                {transactionsInYearSelected.map((transaction, index) => (
                  <tr className="mt-4 bg-gray-700" key={transaction.id}>
                    <td data-last={index === transactionsInYearSelected.length - 1} className="py-5 px-8 text-center border-b-2 border-b-gray-600 data-[last=true]:border-0 text-white">
                      {transaction.description}
                    </td>
                    <td data-last={index === transactionsInYearSelected.length - 1} className="py-5 px-8 text-center border-b-2 border-b-gray-600 data-[last=true]:border-0">
                      <span data-type={transaction.type} className="data-[type=income]:text-green-600 data-[type=outcome]:text-red-700">{transaction.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </td>
                    <td data-last={index === transactionsInYearSelected.length - 1} className="py-5 px-8 text-center border-b-2 border-b-gray-600 data-[last=true]:border-0 text-white">{transaction.category}</td>
                    <td data-last={index === transactionsInYearSelected.length - 1} className="py-5 px-8 text-center border-b-2 border-b-gray-600 data-[last=true]:border-0 text-white">{transaction.method.split('_')[1]}</td>
                    <td data-last={index === transactionsInYearSelected.length - 1} className="py-5 px-8 text-center border-b-2 border-b-gray-600 data-[last=true]:border-0 text-white">{transaction.method.split('_')[0]}</td>
                    <td data-last={index === transactionsInYearSelected.length - 1} className="py-5 px-8 text-center border-b-2 border-b-gray-600 data-[last=true]:border-0 text-white">
                      {transaction.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}