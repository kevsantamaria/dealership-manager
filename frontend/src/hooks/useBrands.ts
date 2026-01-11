import { deleteBrand, fetchBrands } from '@/api/endpoints/brands'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useBrands = () => {
  const queryClient = useQueryClient()

  const getBrands = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  })

  const deleteBrandById = useMutation({
    mutationFn: (id: number) => {
      return deleteBrand(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] })
    },
    onError: (error) => {
      console.error('Error deleting brand:', error)
    },
  })

  return { getBrands, deleteBrandById }
}
