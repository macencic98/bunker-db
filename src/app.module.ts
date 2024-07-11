import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Campaign, CampaignInteractionConglomerate, CampaignPlatform } from './internal/core/domain/entities/campaign.entity';
import { CampaignModule } from './internal/campaign.module';
import { Platform } from './internal/core/domain/entities/platform.entity';
import { InteractionType } from './internal/core/domain/entities/itype.entity';

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
    autoLoadEntities: false,
    synchronize: false,
    
    entities: [
      Campaign,
      Platform,
      CampaignPlatform,
      CampaignInteractionConglomerate,
      InteractionType,
    ],
  }),
  CampaignModule,],
})
export class AppModule {}
