export type UserRole = 'user' | 'admin'

export type User = {
  id: number
  username: string
  password: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export type SafeUser = Omit<User, 'password'>
export type LoginUser = Pick<User, 'username' | 'password'>
