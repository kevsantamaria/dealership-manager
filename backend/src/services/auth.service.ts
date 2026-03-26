import { prisma } from '@/lib/prisma'
import type { LoginUser } from '@/models/entities/user'
import { createSession } from '@/sessions/session.store'
import bcrypt from 'bcryptjs'

export const loginService = async (user: LoginUser) => {
  const { username, password } = user

  const validUser = await prisma.user.findUnique({ where: { username } })
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
