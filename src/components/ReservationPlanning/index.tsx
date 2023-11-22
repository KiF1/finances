export function ReservationPlanning(){
  return(
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
        <strong className="text-base font-medium text-white">Média Entradas</strong>
        <strong className="text-3xl font-bold text-white">R$ 1700,00</strong>
      </div>
      <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
        <strong className="text-base font-medium text-white">Média Gastos</strong>
        <strong className="text-3xl font-bold text-white">R$ 1700,00</strong>
      </div>
      <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
        <strong className="text-base font-medium text-white">6 Meses Reserva</strong>
        <strong className="text-3xl font-bold text-white">R$ 17000,00</strong>
        <div className="w-full bg-gray-600 rounded-full">
          <div style={{ width: '45%' }} className="bg-gray-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">45%</div>
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
        <strong className="text-base font-medium text-white">12 Meses Reserva</strong>
        <strong className="text-3xl font-bold text-white">R$ 170000,00</strong>
        <div className="w-full bg-gray-600 rounded-full">
          <div style={{ width: '45%' }} className="bg-gray-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">45%</div>
        </div>
      </div>
    </div>
  )
}