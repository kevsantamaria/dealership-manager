import type { LoginUser } from '@/models/entities/user'
import { findUserByUsername } from '@/repositories/user.repository'
import bcrypt from 'bcryptjs'

export const loginService = async (user: LoginUser) => {
  const { username, password } = user

  const validUser = await findUserByUsername(username)
  if (!validUser) throw new Error('INVALID_CREDENTIALS')

  const match = await bcrypt.compare(password, validUser.password)
  if (!match) throw new Error('INVALID_CREDENTIALS')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = validUser

  return userWithoutPassword
}
