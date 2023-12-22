import { useContext } from "react"
import { ContextApplication } from "../../context/ContextApplication"
import { calculateMediaTransfersInYear } from "../../utils/calculate-media-transfers";

export function ReservationPlanning(){
  const { transactions, banks } = useContext(ContextApplication);
  const { mediaTotalIncomeInYear, mediaTotalOutcomeInYear, percentageCompletedInSixMonths, percentageCompletedInTwelveMonths, totalReserveInSixMonths, totalReserveInTwelveMonths } = calculateMediaTransfersInYear(transactions!, banks!)
  
  return(
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
        <strong className="text-base font-medium text-white">Média Entradas</strong>
        <strong className="text-3xl font-bold text-white">{mediaTotalIncomeInYear}</strong>
      </div>
      <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
        <strong className="text-base font-medium text-white">Média Gastos</strong>
        <strong className="text-3xl font-bold text-white">{mediaTotalOutcomeInYear}</strong>
      </div>
      <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
        <strong className="text-base font-medium text-white">6 Meses Reserva</strong>
        <strong className="text-3xl font-bold text-white">{totalReserveInSixMonths}</strong>
        <div className="w-full bg-gray-600 rounded-full">
          <div 
            style={{ width: percentageCompletedInSixMonths >= 100 ? '100%' : percentageCompletedInSixMonths !== 0 ? `${percentageCompletedInSixMonths}%` : '50%' }} 
            className="bg-gray-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">
              {percentageCompletedInSixMonths >= 100 ? '100%' : `${percentageCompletedInSixMonths}%`}
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-lg p-8 flex flex-col gap-4">
        <strong className="text-base font-medium text-white">12 Meses Reserva</strong>
        <strong className="text-3xl font-bold text-white">{totalReserveInTwelveMonths}</strong>
        <div className="w-full bg-gray-600 rounded-full">
          <div 
          style={{ width: percentageCompletedInTwelveMonths >= 100 ? '100%' : percentageCompletedInTwelveMonths !== 0 ? `${percentageCompletedInTwelveMonths}%` : '50%' }} 
          className="bg-gray-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">
            {percentageCompletedInTwelveMonths >= 100 ? '100%' : `${percentageCompletedInSixMonths}%`}
          </div>
        </div>
      </div>
    </div>
  )
}