export interface User {
  id: number
  username: string
  role: 'admin' | 'user'
}

export type CreateUserPayload = {
  username: string
  password: string
  role: string
}

export type UpdateUserPayload = Partial<CreateUserPayload>
