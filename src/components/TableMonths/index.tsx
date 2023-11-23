interface Props{
  arrayTransactionsPerMonth: {
    mês: string;
    saldo: number;
    entradas: number;
    saídas: number;
  }[]
}

export function TableMonths({ arrayTransactionsPerMonth }: Props){
  return(
    <table className="w-full">
      <tbody>
        <tr className="mt-4 bg-gray-700">
          <td className="py-5 px-8 text-center border-b-2 border-b-gray-600 rounded-tl-lg text-white font-medium">Mês</td>
          <td className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white font-medium">Entradas</td>
          <td className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white font-medium">Saídas</td>
          <td className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white font-medium">Saldo</td>
          <td className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white font-medium">Média gastos por semana</td>
        </tr>
        {arrayTransactionsPerMonth.map((transaction, index) => (
          <tr className="mt-4 bg-gray-700" key={transaction.mês}>
            <td data-last={index === arrayTransactionsPerMonth.length - 1} className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white data-[last=true]:border-0">{transaction.mês}</td>
            <td data-last={index === arrayTransactionsPerMonth.length - 1} className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white data-[last=true]:border-0">{transaction.entradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            <td data-last={index === arrayTransactionsPerMonth.length - 1} className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white data-[last=true]:border-0">{transaction.saídas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            <td data-last={index === arrayTransactionsPerMonth.length - 1} className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white data-[last=true]:border-0">{transaction.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            <td data-last={index === arrayTransactionsPerMonth.length - 1} className="py-5 px-8 text-center border-b-2 border-b-gray-600 text-white data-[last=true]:border-0">{(transaction.saídas / 4).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}