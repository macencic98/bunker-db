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
    Logger.log("xs1")
    await this.dSource.initialize()
    Logger.log("xs1")
    const queryRunner = this.dSource.createQueryRunner();
    try {
      
      Logger.log("xs1") 

      await queryRunner.connect();
      Logger.log("x2")
      await queryRunner.startTransaction();
      const manager = new TypeORMManager(queryRunner.manager);
      Logger.log("x10.2")
      const result = await workHandler(manager);
      Logger.log("x10.3")
      await queryRunner.commitTransaction();
      Logger.log("x10.4")
      return result;
    } catch (err) {
      Logger.log("nop logea")
      Logger.log(err)
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      Logger.log("x10.4")

      await queryRunner.release();
    }
  }
}