import type { CreateUserDTO, UpdateUserDTO } from '@/models/schemas/user.schema'
import { UserRepository } from '@/repositories/user.repository'
import bcrypt from 'bcryptjs'

const userRepository = new UserRepository()

export class UserService {
  async getAll() {
    return await userRepository.findAll()
  }

  async getById(id: number) {
    const user = await userRepository.findById(id)
    if (!user) throw new Error('NOT_FOUND')
    return user
  }

  async create(data: CreateUserDTO) {
    const existingUser = await userRepository.findByUsername(data.username)
    if (existingUser) throw new Error('USERNAME_ALREADY_EXISTS')

    const hashPassword = await bcrypt.hash(data.password, 10)
    return await userRepository.create({
      ...data,
      password: hashPassword,
    })
  }

  async update(id: number, data: UpdateUserDTO) {
    const existingUser = await userRepository.findById(id)
    if (!existingUser) throw new Error('NOT_FOUND')

    const { username, password, role } = data
    const userToUpdate: Record<string, unknown> = {}

    if (username !== undefined && username.trim() !== '') {
      const userWithSameUsername = await userRepository.findByUsername(username)
      if (userWithSameUsername && userWithSameUsername.id !== id) {
        throw new Error('USERNAME_ALREADY_EXISTS')
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
      throw new Error('NO_FIELDS_TO_UPDATE')
    }

    return await userRepository.update(id, userToUpdate)
  }

  async delete(id: number): Promise<void> {
    const existingUser = await userRepository.findById(id)
    if (!existingUser) throw new Error('NOT_FOUND')

    await userRepository.delete(id)
  }
}
