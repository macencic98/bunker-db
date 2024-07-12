import { Injectable } from '@nestjs/common';
import { IGenericManager, IRepositoryTransactioner } from 'src/internal/core/ports/transactioner.irepository';
import {  DataSource, EntityManager } from 'typeorm';
import { TypeORMManager } from './tporm.manager';

@Injectable()
export class TypeormTransactioner implements IRepositoryTransactioner {
  constructor(private readonly dataSource: DataSource) {}

  async do<T>(workHandler: (workManager: IGenericManager) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const manager = new TypeORMManager(queryRunner.manager);
      const result = await workHandler(manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}