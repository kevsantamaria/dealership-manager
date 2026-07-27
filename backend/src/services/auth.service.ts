import type { LoginUser, SafeUser } from '@/models/entities/user.entity'
import { UserRepository } from '@/repositories/user.repository'
import bcrypt from 'bcryptjs'
import { UnauthorizedError } from '@/errors/UnauthorizedError'

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(user: LoginUser): Promise<{ loggedUser: SafeUser }> {
    const { username, password } = user

    const validUser =
      await this.userRepository.findWithPasswordByUsername(username)
    if (!validUser) throw new UnauthorizedError('Invalid credentials')

    const match = await bcrypt.compare(password, validUser.password)
    if (!match) throw new UnauthorizedError('Invalid credentials')

    const { password: _, ...userWithoutPassword } = validUser

    return { loggedUser: userWithoutPassword }
  }
}
