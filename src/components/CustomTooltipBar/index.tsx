interface Props{
  active?: boolean;
  payload?: {
    payload: {
      entradas: number
      saldo: number
      saídas: number
    }
  }[];
  label?: string;
}

export function CustomTooltipBar({ active, payload, label }: Props){
  console.log(payload)

  return(
    <>
      {active && (
        <div className="rounded-md bg-white text-gray-700 p-4 shadow-md text-center">
          <h4>Mês Selecionado: {label}</h4>
          {payload && <p>Entradas: {payload[0].payload.entradas?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>}
          {payload && <p>Saídas: {payload[0].payload.saídas?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>}
          {payload && <p>Saldo: {payload[0].payload.saldo?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>}
        </div>
      )}
    </>
  )
}