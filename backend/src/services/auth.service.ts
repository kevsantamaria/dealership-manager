import type { LoginUser, User } from '@/models/entities/user'
import { findUserByUsername } from '@/repositories/user.repository'
import { createSession } from '@/sessions/session.store'
import bcrypt from 'bcryptjs'

export const loginService = async (user: LoginUser) => {
  const { username, password } = user

  const validUser: User = await findUserByUsername(username)
  if (!validUser) throw new Error('INVALID_CREDENTIALS')

  const match = await bcrypt.compare(password, validUser.password)
  if (!match) throw new Error('INVALID_CREDENTIALS')

  const sessionId = createSession({
    userId: validUser.id,
    role: validUser.role,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = validUser

  return { user: userWithoutPassword, sessionId }
}
