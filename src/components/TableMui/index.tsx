import { ChangeEvent, useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ContextApplication, Transaction } from '../../context/ContextApplication';
import { getDocs, query, where } from 'firebase/firestore';
import ReactLoading from 'react-loading';
import { useQuery } from '@tanstack/react-query';

interface TransactionsFiltered{
  id: string;
  date: string;
  method: string;
  category: string;
  description: string;
  value: string;
  [key: string]: string;
}

export function TableMui() {
  const { yearSelectedFilterBank, bankSelected, transactionsCollectionRef } = useContext(ContextApplication);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const tableTitlesColumns = [
    { label: 'Descrição', id: 'description' },
    { label: 'Valor', id: 'value' },
    { label: 'Categoria', id: 'category' },
    { label: 'Método de pagamento', id: 'method' }, 
    { label: 'Data', id: 'date' }
  ]

  const { data } = useQuery<TransactionsFiltered[], Error>({
    queryKey: ["transactionsBankSelected"],
    queryFn: async () => {
      const whereClauses = [
        where('bank', '==', bankSelected),
        where('createdAt', '>=', `01/01/${yearSelectedFilterBank}`),
        where('createdAt', '<=', `31/12/${yearSelectedFilterBank}`)
      ];
      
      const queryTransactions = await query(transactionsCollectionRef, ...whereClauses);    
      const data = await getDocs(queryTransactions);
  
      const filteredData = data.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as Transaction;
      })
  
      const newvaluesData = filteredData.map(data => {
        return { 
          id: data.id, 
          description: data.description, 
          value: data.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 
          category: data.type === 'income' ? 'Entrada' : 'Saída', 
          method: data.method.split('_')[0] === 'credit' ? 'Crédito' : 'Débito', 
          date: data.createdAt 
        }
      })

      return newvaluesData
    },
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {data !== undefined ? (
        <div className='w-full flex flex-col gap-8 bg-gray-700 rounded-lg p-8'>
          <strong className="text-xl font-medium text-white">Tranferências - 2023</strong>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {tableTitlesColumns.map(column => (
                      <TableCell
                        key={column.id}
                        align="left"
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          {tableTitlesColumns.map(column => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align="left">{value}</TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      ) : (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <ReactLoading
            className="w-fit"
            type="spinningBubbles"
            color="#181C2A"
            height="80px"
            width="100px"
          />
        </div>
      )}
    </>
  );
}