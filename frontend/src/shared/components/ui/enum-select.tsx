import type { ComponentProps } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

type EnumSelectOption = readonly string[]

interface EnumSelectProps<T extends EnumSelectOption>
  extends Omit<ComponentProps<typeof Select>, 'children'> {
  options: T
  labels: Record<T[number], string>
  placeholder?: string
}

export function EnumSelect<T extends EnumSelectOption>({
  options,
  labels,
  placeholder,
  value,
  onValueChange,
  ...props
}: EnumSelectProps<T>) {
  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {labels[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
