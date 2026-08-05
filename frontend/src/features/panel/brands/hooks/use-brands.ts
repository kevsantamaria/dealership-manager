import {
  deleteBrand,
  fetchBrands,
  fetchNameAndIdBrand,
} from '../services/brands-service'
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

  const getNameAndIdBrand = useQuery({
    queryKey: ['brands'],
    queryFn: fetchNameAndIdBrand,
  })

  return { getBrands, deleteBrandById, getNameAndIdBrand }
}
