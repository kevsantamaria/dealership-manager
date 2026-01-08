import {
  addSupplier,
  fetchSuppliers,
  fetchSuppliersWithNameAndId,
} from '@/api/endpoints/suppliers'
import type { CreateSupplierPayload } from '@/types/supplier'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useSuppliers = () => {
  const getSuppliers = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliers,
  })

  const getSuppliersWithNameAndId = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliersWithNameAndId,
  })

  const postSupplier = useMutation({
    mutationFn: (supplier: CreateSupplierPayload) => {
      return addSupplier(supplier)
    },
  })

  return { getSuppliers, getSuppliersWithNameAndId, postSupplier }
}
