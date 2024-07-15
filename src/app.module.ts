import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { InteractionModule } from './interaction/interaction.module';
import { CampaignModule } from './campaign/campaign.module';
import { TransactionerModule } from './transactioner/transactioner.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV}`,
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    autoLoadEntities: true,
  }),
  TransactionerModule, CampaignModule, InteractionModule, ClientsModule],
})
export class AppModule {}
