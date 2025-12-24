export type UserRole = 'user' | 'admin'

export interface User {
  id: number
  username: string
  passwordHash: string
  role: UserRole
  createdAt: string
  updatedAt: string
}