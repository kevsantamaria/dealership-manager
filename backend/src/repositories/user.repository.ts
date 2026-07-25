import { prisma } from '@/config/prisma'
import type { SafeUser, User } from '@/models/entities/user.entity'
import type { CreateUserDTO, UpdateUserDTO } from '@/models/schemas/user.schema'

export class UserRepository {
  constructor() {}

  async findAll(): Promise<SafeUser[]> {
    const users = await prisma.user.findMany()
    return users.map(({ password: _, ...user }) => user)
  }

  async findById(id: number): Promise<SafeUser | null> {
    return await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    })
  }

  async findByUsername(username: string): Promise<SafeUser | null> {
    return await prisma.user.findFirst({
      where: { username },
      omit: { password: true },
    })
  }

  async findWithPasswordByUsername(username: string): Promise<User | null> {
    return await prisma.user.findFirst({ where: { username } })
  }

  async create(data: CreateUserDTO): Promise<SafeUser> {
    return await prisma.user.create({ data })
  }

  async update(id: number, data: UpdateUserDTO): Promise<SafeUser> {
    return await prisma.user.update({ where: { id }, data })
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }
}
