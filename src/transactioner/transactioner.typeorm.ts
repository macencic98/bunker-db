import { Injectable, Logger } from '@nestjs/common';
import {IRepositoryTransactioner } from '../transactioner/transactioner.irepository';
import { TypeORMManager } from './transactioner.manager';
import { IGenericManager } from './transactioner.imanager';
import { DataSource } from 'typeorm';
import { ConnectionSource } from './transactioner.internalsource';


@Injectable()
export class TypeormTransactioner implements IRepositoryTransactioner {
  private dSource: DataSource;
  constructor() {
    this.dSource = ConnectionSource.createConnectionSource()
  }

  async do<T>(workHandler: (workManager: TypeORMManager) => Promise<T>): Promise<T> {
    await this.dSource.initialize()
    const queryRunner = this.dSource.createQueryRunner();
    try {
      

      await queryRunner.connect();
      await queryRunner.startTransaction();
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