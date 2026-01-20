import {
  addSupplier,
  deleteSupplier,
  fetchSuppliers,
  fetchSuppliersWithNameAndId,
  updateSupplier,
} from '@/api/endpoints/suppliers'
import type {
  CreateSupplierPayload,
  UpdateSupplierPayload,
} from '@/types/supplier'
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

  const updateSupplierById = useMutation({
      mutationFn: ({
        id,
        supplier,
      }: {
        id: number
        supplier: UpdateSupplierPayload
      }) => {
        return updateSupplier(id, supplier)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['suppliers'] })
      },
      onError: (error) => {
        console.error('Error updating supplier:', error)
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
    updateSupplierById,
    deleteSupplierById,
  }
}
