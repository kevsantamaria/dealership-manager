import { BadRequestError } from '@/errors/BadRequest'
import { ConflictError } from '@/errors/ConflictError'
import { NotFoundError } from '@/errors/NotFound'
import type { SafeUser } from '@/models/entities/user.entity'
import type { CreateUserDTO, UpdateUserDTO } from '@/models/schemas/user.schema'
import { UserRepository } from '@/repositories/user.repository'
import bcrypt from 'bcryptjs'

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll(): Promise<SafeUser[]> {
    const users = await this.userRepository.findAll()
    return users.map(({ password: _, ...user }) => user)
  }

  async getById(id: number): Promise<SafeUser> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new NotFoundError('User')
    return user
  }

  async create(data: CreateUserDTO): Promise<SafeUser> {
    const existingUser = await this.userRepository.findByUsername(data.username)
    if (existingUser)
      throw new ConflictError('User with the same username already exists')

    const hashPassword = await bcrypt.hash(data.password, 10)
    const user = await this.userRepository.create({
      ...data,
      password: hashPassword,
    })
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async update(id: number, data: UpdateUserDTO): Promise<SafeUser> {
    const existingUser = await this.userRepository.findById(id)
    if (!existingUser) throw new NotFoundError('User')

    const { username, password, role } = data
    const userToUpdate: Record<string, unknown> = {}

    if (username !== undefined && username.trim() !== '') {
      const userWithSameUsername =
        await this.userRepository.findByUsername(username)
      if (userWithSameUsername && userWithSameUsername.id !== id) {
        throw new ConflictError('User with the same username already exists')
      }
      userToUpdate.username = username
    }

    if (role !== undefined) {
      userToUpdate.role = role
    }

    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10)
      userToUpdate.password = hashedPassword
    }

    if (Object.keys(userToUpdate).length === 0) {
      throw new BadRequestError('No fields to update')
    }

    const user = await this.userRepository.update(id, userToUpdate)
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async delete(id: number): Promise<void> {
    const existingUser = await this.userRepository.findById(id)
    if (!existingUser) throw new NotFoundError('User')

    await this.userRepository.delete(id)
  }
}
