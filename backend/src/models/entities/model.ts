export interface Model {
  id: number
  name: string
  launchYear: number
  brandId: number
}

export type NewModel = Omit<Model, 'id'>
export type UpdateModel = Partial<Omit<Model, 'id'>>
