import { ReactNode, useEffect, useState, createContext } from "react";
import { auth, database } from "../lib/firebase";
import { User } from "firebase/auth";
import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import { CollectionReference, DocumentData, collection, getDocs } from "firebase/firestore";

export interface Transaction{
  id: string;
  category: string;
  createdAt: string;
  description: string;
  installments: number | undefined;
  method: string;
  type: string;
  userId: string;
  value: number;
}

interface ContextType {
  user: User | null;
  yearSelected: number;
  transactions: Transaction[] | undefined;
  fetchTransaction: boolean;
  transactionsInYearSelected: Transaction[] | undefined
  transactionsCollectionRef: CollectionReference<DocumentData, DocumentData>
  setYearSelected: (value: number) => void;
  refetchTransactions: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Transaction[], Error>>;
}

interface ContextProviderProps { children: ReactNode }

export const ContextApplication = createContext({} as ContextType);

export function ContextProvider({ children }: ContextProviderProps) {
  const storedUser = localStorage.getItem('user');
  const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState<User | null>(initialUser);
  const [yearSelected, setYearSelected] = useState(2023);
  
  const transactionsCollectionRef = collection(database, 'transactions');

  const { data: transactions, isFetching: fetchTransaction, refetch: refetchTransactions } = useQuery<Transaction[], Error>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const data = await getDocs(transactionsCollectionRef);
      const filteredData = data.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as Transaction;
      }).filter(transaction => transaction.userId === user?.uid);
      return filteredData;
    },
  });

  const transactionsInYearSelected = transactions?.filter(transaction => parseInt(transaction.createdAt.split('/')[2]) === yearSelected);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);

      localStorage.setItem('user', JSON.stringify(authUser));
    });

    return () => unsubscribe();
  }, []);

  return (
    <ContextApplication.Provider value={{ user, yearSelected, transactions, fetchTransaction, refetchTransactions, setYearSelected, transactionsInYearSelected, transactionsCollectionRef }}>
      {children}
    </ContextApplication.Provider>
  );
}