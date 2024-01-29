import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { database } from "../lib/firebase";

export const useMutationDelete = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
      mutationFn: async (request: { id: string }) => {
      return await deleteDoc(doc(database, "banks", request.id));
    },
    onSuccess: () => {
      toast.success(`Banco deletado com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
    onError: () => {
      toast.error('Erro ao deletar banco!');
    }
  })

  return { mutate, isPending, isSuccess, isError }
}