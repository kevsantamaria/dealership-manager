export type UserRole = 'user' | 'admin'

export interface User {
  id: number
  username: string
  password: string
  role: UserRole
  createdAt: string
  updatedAt: string
}
