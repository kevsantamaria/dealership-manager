import { useBrands } from '@/hooks/useBrands'
import type { Brand } from '@/types/brand'
import BrandCard from './components/BrandCard'

function Brands() {
  const { getBrands } = useBrands()
  const { isLoading, error, data } = getBrands

  if (isLoading) return <p>Cargando marcas...</p>
  if (error) return <p>Error al cargar marcas</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((brand: Brand) => (
        <BrandCard />
      ))}
    </div>
  )
}

export default Brands
