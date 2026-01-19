import { CalendarIcon, Pencil } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import type { UpdateVehiclePayload } from "@/types/vehicle"
import { useEffect, useState } from "react"
import { Field, FieldGroup } from "../ui/field"

interface Props {
  vehicle: UpdateVehiclePayload
  onSave: (vehicle: UpdateVehiclePayload) => void
  suppliers: { id: string; name: string }[]
  trims: { id: string; name: string }[]
}


export function AlertEditVehicleDialog({
  vehicle,
  onSave,
  suppliers,
  trims,
}: Props) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<UpdateVehiclePayload>(vehicle)

  useEffect(() => {
    setFormData(vehicle)
  }, [vehicle])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSelectChange = (name: keyof VehicleData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      arrivalDate: date || null,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 size-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Vehículo</DialogTitle>
          <DialogDescription>
            Modifica la información del vehículo. Haz clic en guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field className="space-y-2">
                <Label htmlFor="vin">VIN</Label>
                <Input
                  id="vin"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  placeholder="1HGBH41JXMN109186"
                />
              </Field>
              <Field className="space-y-2">
                <Label htmlFor="licensePlate">Placa</Label>
                <Input
                  id="licensePlate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  placeholder="ABC-123"
                />
              </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Negro"
                />
              </Field>
              <Field className="space-y-2">
                <Label htmlFor="mileage">Kilometraje</Label>
                <Input
                  id="mileage"
                  name="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="50000"
                />
              </Field>
            </FieldGroup>
            {/* Fecha de Llegada */}
            <Field className="space-y-2">
              <Label>Fecha de Llegada</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.arrivalDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {formData.arrivalDate ? (
                      format(formData.arrivalDate, "PPP", { locale: es })
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.arrivalDate || undefined}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </Field>

            {/* Precios */}
            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field className="space-y-2">
                <Label htmlFor="purchasePrice">Precio de Compra</Label>
                <Input
                  id="purchasePrice"
                  name="purchasePrice"
                  type="number"
                  value={formData.purchasePrice}
                  onChange={handleInputChange}
                  placeholder="25000"
                />
              </Field>
              <Field className="space-y-2">
                <Label htmlFor="suggestedPrice">Precio Sugerido</Label>
                <Input
                  id="suggestedPrice"
                  name="suggestedPrice"
                  type="number"
                  value={formData.suggestedPrice}
                  onChange={handleInputChange}
                  placeholder="30000"
                />
              </Field>
            </FieldGroup>

            {/* Condición */}
            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field className="space-y-2">
                <Label htmlFor="rateCondition">Condición</Label>
                <Select
                  value={formData.rateCondition}
                  onValueChange={(value) =>
                    handleSelectChange("rateCondition", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar condición" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field className="space-y-2">
                <Label htmlFor="stockStatus">Estado de Stock</Label>
                <Select
                  value={formData.stockStatus}
                  onValueChange={(value) =>
                    handleSelectChange("stockStatus", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {stockStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>

            {/* Descripción de Condición */}
            <Field className="space-y-2">
              <Label htmlFor="rateDescription">Descripción de Condición</Label>
              <Textarea
                id="rateDescription"
                name="rateDescription"
                value={formData.rateDescription}
                onChange={handleInputChange}
                placeholder="Describe el estado actual del vehículo..."
                rows={3}
              />
            </Field>

            {/* Proveedor y Trim */}
            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field className="space-y-2">
                <Label htmlFor="supplierId">Proveedor</Label>
                {suppliers.length > 0 ? (
                  <Select
                    value={formData.supplierId}
                    onValueChange={(value) =>
                      handleSelectChange("supplierId", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="supplierId"
                    name="supplierId"
                    value={formData.supplierId}
                    onChange={handleInputChange}
                    placeholder="ID del proveedor"
                  />
                )}
              </Field>
              <Field className="space-y-2">
                <Label htmlFor="trimId">Versión (Trim)</Label>
                {trims.length > 0 ? (
                  <Select
                    value={formData.trimId}
                    onValueChange={(value) =>
                      handleSelectChange("trimId", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar versión" />
                    </SelectTrigger>
                    <SelectContent>
                      {trims.map((trim) => (
                        <SelectItem key={trim.id} value={trim.id}>
                          {trim.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="trimId"
                    name="trimId"
                    value={formData.trimId}
                    onChange={handleInputChange}
                    placeholder="ID de la versión"
                  />
                )}
              </Field>
            </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
