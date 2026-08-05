type UserRoles = 'admin' | 'user'

export type User = {
  id: number
  username: string
  role: UserRoles
  createdAt: Date
  updatedAt: Date
}

export type CreateUserPayload = {
  username: string
  password: string
  role: string
}

export type UpdateUserPayload = Partial<CreateUserPayload>
