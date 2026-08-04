import { prisma } from '@/config/prisma'
import type { CreateUserDTO, UpdateUserDTO } from '@/models/schemas/user.schema'

export class UserRepository {
  constructor() {}

  async findAll() {
    return await prisma.user.findMany()
  }

  async findById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    })
  }

  async findByUsername(username: string) {
    return await prisma.user.findFirst({
      where: { username },
      omit: { password: true },
    })
  }

  async findWithPasswordByUsername(username: string) {
    return await prisma.user.findFirst({ where: { username } })
  }

  async create(data: CreateUserDTO) {
    return await prisma.user.create({ data })
  }

  async update(id: number, data: UpdateUserDTO) {
    return await prisma.user.update({ where: { id }, data })
  }

  async delete(id: number) {
    await prisma.user.delete({ where: { id } })
  }
}
