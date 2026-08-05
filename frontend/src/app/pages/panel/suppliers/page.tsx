import { useSuppliers } from '@/features/panel/suppliers/hooks/use-suppliers'
import type { Supplier } from '@/features/panel/suppliers/types/supplier-types'
import SupplierCard from '@/features/panel/suppliers/components/supplier-card'

function Suppliers() {
  const { getAll } = useSuppliers()
  const { isLoading, error, data } = getAll

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
