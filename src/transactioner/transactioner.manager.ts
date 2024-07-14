import { EntityManager } from 'typeorm';
import { IGenericManager } from './transactioner.imanager';
import { Inject } from '@nestjs/common';

export class TypeORMManager implements IGenericManager {
  constructor(
    @Inject(EntityManager)
    private readonly manager: EntityManager) {}

  async save<T>(entity: T): Promise<T> {
    return this.manager.save(entity);
  }

}