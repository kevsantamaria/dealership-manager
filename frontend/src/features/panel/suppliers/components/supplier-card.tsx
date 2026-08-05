import DeleteModal from '@/shared/components/modal/delete-modal'
import EditSupplierDialog from '../components/edit-supplier-dialog'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { useSuppliers } from '../hooks/use-suppliers'
import type { SupplierWithVehicleCount } from '../types/supplier-types'
import { IconLoader2, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'

interface Props {
  supplier: SupplierWithVehicleCount
}

function SupplierCard({ supplier }: Props) {
  const { id, name, country, email, telephone, type, vehiclesCount } = supplier
  const { remove } = useSuppliers()
  const { mutate, isPending } = remove

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
            <CardTitle className="text-2xl font-bold flex justify-between">
              {name}
            </CardTitle>
            <div className="flex items-center gap-1">
              <EditSupplierDialog supplierId={id} supplier={supplier} />
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-destructive hover:text-primary-foreground hover:bg-destructive"
                onClick={() => setOpenDelete(true)}
                disabled={vehiclesCount > 0 || isPending}
              >
                {isPending ? (
                  <IconLoader2 className="animate-spin h-4 w-4" />
                ) : (
                  <IconTrash className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {email && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Correo:</span>
              <span className="font-medium">{email}</span>
            </div>
          )}
          {telephone && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Teléfono:</span>
              <span className="font-medium">{telephone}</span>
            </div>
          )}
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
              {vehiclesCount}
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default SupplierCard
