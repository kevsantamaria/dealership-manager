import { supplierService } from '../services/supplier-service'
import type {
  CreateSupplierPayload,
  UpdateSupplierPayload,
} from '../types/supplier-types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useSuppliers = () => {
  const queryClient = useQueryClient()

  const getAll = useQuery({
    queryKey: ['suppliers'],
    queryFn: supplierService.getAll,
  })

  const getNamesAndIds = useQuery({
    queryKey: ['suppliers'],
    queryFn: supplierService.getNamesAndIds,
  })

  const add = useMutation({
    mutationFn: (supplier: CreateSupplierPayload) => {
      return supplierService.add(supplier)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    },
  })

  const update = useMutation({
    mutationFn: ({
      id,
      supplier,
    }: {
      id: number
      supplier: UpdateSupplierPayload
    }) => {
      return supplierService.update(id, supplier)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    },
    onError: (error) => {
      console.error('Error updating supplier:', error)
    },
  })

  const remove = useMutation({
    mutationFn: (id: number) => {
      return supplierService.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    },
    onError: (error) => {
      console.error('Error deleting supplier:', error)
    },
  })

  return {
    add,
    getAll,
    getNamesAndIds,
    update,
    remove,
  }
}
