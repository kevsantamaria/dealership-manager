import DeleteModal from '@/components/modal/DeleteModal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBrands } from '@/hooks/useBrands'
import type { Brand } from '@/types/brand'
import { IconLoader2, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'

interface Props {
  brand: Brand
}

function BrandCard({ brand }: Props) {
  const { id, name, countryOrigin, numberOfVehicles } = brand
  const { deleteBrandById } = useBrands()
  const { mutate, isPending } = deleteBrandById

  console.log(numberOfVehicles)

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
        title="¿Eliminar marca?"
        description="Esta acción no se puede deshacer. La marca será eliminada permanentemente del sistema, junto con sus modelos y versiones."
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
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
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              País de origen
            </span>
            <Badge variant="secondary" className="font-medium">
              {countryOrigin}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Cantidad de vehículos
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

export default BrandCard
