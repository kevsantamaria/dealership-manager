import { fetchSuppliers, fetchSuppliersWithNameAndId } from '@/api/endpoints/suppliers'
import { useQuery } from '@tanstack/react-query'

export const useSuppliers = () => {

    const getSuppliers = useQuery({
      queryKey: ['suppliers'],
      queryFn: fetchSuppliers,
    })

  const getSuppliersWithNameAndId = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliersWithNameAndId,
  })

  return { getSuppliers, getSuppliersWithNameAndId }
}
