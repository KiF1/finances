interface Props{
  active?: boolean;
  payload?: {
    value: number
  }[];
  label?: string;
}

export function CustomTooltip({ active, payload, label }: Props){
  return(
    <>
      {active && (
        <div className="rounded-md bg-white text-gray-700 p-4 shadow-md text-center">
          <h4>Mês Selecionado: {label}</h4>
          {payload && <p>Fatura Total: {payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>}
        </div>
      )}
    </>
  )
}