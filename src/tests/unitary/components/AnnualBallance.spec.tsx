import { render, screen } from '@testing-library/react'
import { AnnualBalance } from '../../../components/AnnualBalance'
import { ContextApplication, ContextType } from '../../../context/ContextApplication'

const arrayTransactionsPerMonth = [
  { 
    mês: "Janeiro",
    saldo: 1350,
    entradas: 1500,
    saídas: 150,
  }
]

const yearSelected = 2024

jest.mock('recharts', () => {
  const OriginalRechartsModule = jest.requireActual('recharts');

  return {
    ...OriginalRechartsModule,
    ResponsiveContainer: ({ height, children }: any) => (
      <div className="recharts-responsive-container" style={{ width: 800, height }}>
        {children}
      </div>
    ),
  };
});

jest.mock('../../../utils/calc-total-in-year', () => ({
  calcTotalInYear: jest.fn().mockReturnValue({
    balanceInTheYear: 1300,
    incomesInTheYear: 1500,
    outcomesInTheYear: 200,
  }),
}));


describe('AnnualBalance Component', () => {
  it('renders correctly', () => {
    render(
      <ContextApplication.Provider value={{ yearSelected } as unknown as ContextType}>
        <AnnualBalance arrayTransactionsPerMonth={arrayTransactionsPerMonth} />
      </ContextApplication.Provider>
    )

    expect(screen.getByText('Entradas | Saídas - 2024')).toBeInTheDocument()
  })

  it('loads table correctly', async () => {
    render(
      <ContextApplication.Provider value={{ yearSelected } as unknown as ContextType}>
        <AnnualBalance arrayTransactionsPerMonth={arrayTransactionsPerMonth} />
      </ContextApplication.Provider>
    )

    expect(await screen.findByText('1300')).toBeInTheDocument()
  })
})