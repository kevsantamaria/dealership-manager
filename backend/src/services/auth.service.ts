import type { LoginUser, SafeUser } from '@/models/entities/user.entity'
import { createSession } from '@/sessions/session.store'
import { UserRepository } from '@/repositories/user.repository'
import bcrypt from 'bcryptjs'

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(user: LoginUser): Promise<{ user: SafeUser; sessionId: string }> {
    const { username, password } = user

    const validUser = await this.userRepository.findWithPasswordByUsername(username)
    if (!validUser) throw new Error('INVALID_CREDENTIALS')

    const match = await bcrypt.compare(password, validUser.password)
    if (!match) throw new Error('INVALID_CREDENTIALS')

    const sessionId = createSession({
      userId: validUser.id,
      role: validUser.role,
    })

    const { password: _, ...userWithoutPassword } = validUser

    return { user: userWithoutPassword, sessionId }
  }
}
