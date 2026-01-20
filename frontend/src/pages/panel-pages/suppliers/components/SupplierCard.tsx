import DeleteModal from '@/components/modal/DeleteModal'
import EditSupplierDialog from '@/components/modal/EditSupplierDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSuppliers } from '@/hooks/useSuppliers'
import type { Supplier } from '@/types/supplier'
import { IconLoader2, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'

interface Props {
  supplier: Supplier
}

function SupplierCard({ supplier }: Props) {
  const { id, name, country, contact, type, numberOfVehicles } = supplier
  const { deleteSupplierById } = useSuppliers()
  const { mutate, isPending } = deleteSupplierById

  const [openDelete, setOpenDelete] = useState(false)
  const handleDelete = () => {
    if (!id) return

    mutate(Number(id), {
      onSuccess: () => {
        setOpenDelete(false)
      },
    })
  }

  return (
    <>
      {/* Delete Dialog */}
      <DeleteModal
        open={openDelete}
        loading={isPending}
        title="¿Eliminar proveedor?"
        description="Esta acción no se puede deshacer. El proveedor será eliminado permanentemente del sistema."
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
      <Card className="w-full max-w-xs h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            <EditSupplierDialog supplierId={id} supplier={supplier}/>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-destructive hover:text-primary-foreground hover:bg-destructive"
              onClick={() => setOpenDelete(true)}
              disabled={numberOfVehicles > 0 || isPending}
            >
              {isPending ? (
                <IconLoader2 className="animate-spin h-4 w-4" />
              ) : (
                <IconTrash className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Contacto:</span>
            <span className="font-medium">{contact}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">País:</span>
            <span className="font-medium">{country}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tipo:</span>
            <span className="font-medium">{type}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Cantidad de vehículos:
            </span>
            <span className="text-2xl font-bold text-primary">
              {numberOfVehicles}
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default SupplierCard
