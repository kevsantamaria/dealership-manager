import {
  addSupplier,
  deleteSupplier,
  fetchSuppliers,
  fetchSuppliersWithNameAndId,
} from '@/api/endpoints/suppliers'
import type { CreateSupplierPayload } from '@/types/supplier'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useSuppliers = () => {
  const queryClient = useQueryClient()

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

  const deleteSupplierById = useMutation({
    mutationFn: (id: number) => {
      return deleteSupplier(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    },
    onError: (error) => {
      console.error('Error deleting supplier:', error)
    },
  })

  return {
    getSuppliers,
    getSuppliersWithNameAndId,
    postSupplier,
    deleteSupplierById,
  }
}
