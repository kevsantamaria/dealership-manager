export type Model = {
  id: number
  name: string
  launchYear: number
  brandId: number
  createdAt: Date
  updatedAt: Date
}

export type ModelWithNameAndId = Pick<Model, 'id' | 'name'>
