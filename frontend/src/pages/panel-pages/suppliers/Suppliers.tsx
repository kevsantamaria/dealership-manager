import { useSuppliers } from '@/hooks/useSuppliers'
import type { Supplier } from '@/types/supplier'
import SupplierCard from './components/SupplierCard'

function Suppliers() {
  const { getSuppliers } = useSuppliers()
  const { isLoading, error, data } = getSuppliers

  if (isLoading) return <p>Cargando proveedores...</p>
  if (error) return <p>Error al cargar proveedores</p>

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 place-items-center">
      {data?.map((supplier: Supplier) => (
        <SupplierCard key={supplier.id} supplier={supplier} />
      ))}
    </div>
  )
}

export default Suppliers
