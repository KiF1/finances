import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ContextApplication, ContextType } from '../../../context/ContextApplication'
import { BanksCards } from '../../../components/BanksCards';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMutationDelete } from '../../../hooks/useMutationDelete';
import { mocked } from 'jest-mock'


const banks = [
  { 
    id: 'fake-id',
    bank: 'fake-bank',
    createdAt: 'fake-date',
    date: 1,
    limit: 1000,
    userId: 'fake-user-id',
  }
]

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const renderCompontent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ContextApplication.Provider value={{ banks } as unknown as ContextType}>
        <BanksCards />
      </ContextApplication.Provider>
    </QueryClientProvider>
  )
}

jest.mock('../../../hooks/useMutationDelete')

describe('BankCards Component', () => {
  
  it('renders correctly', () => {
    const mutateMocked = jest.fn();
    const useMutationDeleteMocked = mocked(useMutationDelete);

    useMutationDeleteMocked.mockReturnValueOnce({ mutate: mutateMocked, isPending: false, isSuccess: true, isError: false })
    renderCompontent();

    expect(screen.getByText('fake-bank')).toBeInTheDocument()
  })

  it('called mutate to click in button delete', async () => {
      const mutateMocked = jest.fn();
      const useMutationDeleteMocked = mocked(useMutationDelete);

      useMutationDeleteMocked.mockReturnValueOnce({ mutate: mutateMocked, isPending: false, isSuccess: true, isError: false })

      renderCompontent();

      const buttonDelete = screen.getByTestId('button-delete')
      fireEvent.click(buttonDelete)

      await waitFor(() => {
        expect(mutateMocked).toHaveBeenCalledTimes(1);
      })
    })

    it('not called useMutationDelete if mutate is pending', async () => {
      const mutateMocked = jest.fn();
      const useMutationDeleteMocked = mocked(useMutationDelete);

      useMutationDeleteMocked.mockReturnValueOnce({ mutate: mutateMocked, isPending: true, isSuccess: false, isError: false })

      renderCompontent();
    
      const buttonDelete = screen.getByTestId('button-delete');
      fireEvent.click(buttonDelete);
    
      await waitFor(() => {
        expect(mutateMocked).not.toHaveBeenCalled();
        expect(buttonDelete).toBeDisabled();
      });
    });

    it('toast success message render in page', async () => {
      const mutateMocked = jest.fn();
      const useMutationDeleteMocked = mocked(useMutationDelete);

      useMutationDeleteMocked.mockReturnValueOnce({ mutate: mutateMocked, isPending: false, isSuccess: true, isError: false })

      renderCompontent();

      const buttonDelete = screen.getByTestId('button-delete')
      fireEvent.click(buttonDelete)

      await waitFor(() => {
        expect(screen.getByText('Banco deletado com sucesso!')).toBeInTheDocument()
      })
    })

    it('toast error message render in page', async () => {
      const mutateMocked = jest.fn();
      const useMutationDeleteMocked = mocked(useMutationDelete);

      useMutationDeleteMocked.mockReturnValueOnce({ mutate: mutateMocked, isPending: false, isSuccess: false, isError: true })

      renderCompontent();

      const buttonDelete = screen.getByTestId('button-delete')
      fireEvent.click(buttonDelete)

      await waitFor(() => {
        expect(screen.getByText('Erro ao deletar banco!')).toBeInTheDocument()
      })
    })
  })