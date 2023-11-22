import { Transaction } from "../../context/ContextApplication"

interface Props{
  transactions: Transaction[]
}

export function Table({ transactions }: Props){
  return(
    <table className="w-full border-separate mt-6">
      <tbody>
        <tr className="mt-4 bg-gray-700">
          <td className="py-5 px-8 rounded-tl-lg text-white font-medium">Descrição da Transação</td>
          <td className="py-5 px-8 text-white font-medium">Valor da Transação</td>
          <td className="py-5 px-8 text-white font-medium">Categoria da Transação</td>
          <td className="py-5 px-8 text-white font-medium">Banco</td>
          <td className="py-5 px-8 text-white font-medium">Método de pagamento</td>
          <td className="py-5 px-8 rounded-tr-lg text-white font-medium">Data da Transação</td>
        </tr>
        {transactions.map((transaction) => (
          <tr className="mt-4 bg-gray-700" key={transaction.id}>
            <td className="py-5 px-8 text-white">
              {transaction.description}
            </td>
            <td className="py-5 px-8">
              <span data-type={transaction.type} className="data-[type=income]:text-green-600 data-[type=outcome]:text-red-700">{transaction.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </td>
            <td className="py-5 px-8 text-white">{transaction.category}</td>
            <td className="py-5 px-8 text-white">{transaction.method.split('_')[1]}</td>
            <td className="py-5 px-8 text-white">{transaction.method.split('_')[0]}</td>
            <td className="py-5 px-8 text-white">
              {transaction.createdAt}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}