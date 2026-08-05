export const userTypes = ['user', 'admin'] as const

export type UserTypes = (typeof userTypes)[number]
export const mappedUserTypes: { [key in UserTypes]: string } = {
  user: 'Usuario',
  admin: 'Administrador',
}
