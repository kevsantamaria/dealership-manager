import { fetchSuppliersWithNameAndId } from '@/api/endpoints/suppliersWithNameAndId'
import { useQuery } from '@tanstack/react-query'

export const useSuppliers = () => {
  const getSuppliersWithNameAndId = useQuery({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliersWithNameAndId,
  })

  return { getSuppliersWithNameAndId }
}
