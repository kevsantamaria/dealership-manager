import type { TrimWithNameAndId } from '@/models/entities/trim.entity'
import { TrimRepository } from '@/repositories/trim.repository'

export class TrimService {
  constructor(private trimRepository: TrimRepository) {}

  async getNamesAndIds(): Promise<TrimWithNameAndId[]> {
    return await this.trimRepository.findNamesAndIds()
  }
}
