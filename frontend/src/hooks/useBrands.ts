import { fetchBrands } from '@/api/endpoints/brands'
import { useQuery } from '@tanstack/react-query'

export const useBrands = () => {
  const getBrands = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  })

  return { getBrands }
}
