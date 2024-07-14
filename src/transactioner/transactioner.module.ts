import { Module } from "@nestjs/common";
import { IRepositoryTransactioner } from "./transactioner.irepository";
import { TypeormTransactioner } from "./transactioner.typeorm";
import { DbModule } from "src/db/db.module";
import { ConnectionSource } from "./transactioner.internalsource";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    autoLoadEntities: true,
  })],
  providers: [ ConnectionSource, {
      provide: IRepositoryTransactioner,
      useClass: TypeormTransactioner
    },
  ],
  exports: [
    TransactionerModule, IRepositoryTransactioner, ConnectionSource
  ],
})

export class TransactionerModule {}
