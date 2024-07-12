import { IGenericManager } from 'src/internal/core/ports/transactioner.irepository';
import { EntityManager } from 'typeorm';

export class TypeORMManager implements IGenericManager {
  constructor(private readonly manager: EntityManager) {}

  async save<T>(entity: T): Promise<T> {
    return this.manager.save(entity);
  }

}