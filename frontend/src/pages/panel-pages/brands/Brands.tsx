import { useBrands } from '@/hooks/useBrands'
import type { Brand } from '@/types/brand'
import BrandCard from './components/BrandCard'

function Brands() {
  const { getBrands } = useBrands()
  const { isLoading, error, data } = getBrands

  if (isLoading) return <p>Cargando marcas...</p>
  if (error) return <p>Error al cargar marcas</p>

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 place-items-center">
      {data?.map((brand: Brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  )
}

export default Brands
