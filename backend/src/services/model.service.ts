import type { ModelWithNameAndId } from '@/models/entities/model.entity'
import { ModelRepository } from '@/repositories/model.repository'

export class ModelService {
  constructor(private modelRepository: ModelRepository) {}

  async getNamesAndIds(): Promise<ModelWithNameAndId[]> {
    return await this.modelRepository.findNamesAndIds()
  }
}
