import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/getProductById.action"
import { createUpdateProductAction } from "../actions/create-update-product-action"
import type { Product } from "@/interfaces/product.interface"

export const useProduct = (id: string) => {

    const querClient = useQueryClient();

    const query = useQuery({
        queryKey: ["product", {id}],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5 //* 5 Minutos
    })

    const mutation = useMutation({
      mutationFn: createUpdateProductAction,
      onSuccess: (product: Product) => {
        //! Invalidar cache para mostrar productos actualizados en el grid de products
        querClient.invalidateQueries({queryKey: ["products"]})
        querClient.invalidateQueries({queryKey: ["product", {id: product.id}]})

        //! Actualizar query data
        querClient.setQueryData(["products", {id: product.id}], product)
      }
    })

  return {
    ...query,
    mutation
  }
}
