type Role = 'admin' | 'user'

export type UserLogged = {
  id: number
  username: string
  role: Role
}

export type LoginPayload = {
  username: string
  password: string
}
