import { Module } from '@nestjs/common';


import { ICampaignService } from './core/ports/campaign.iservice';

import { ICampaignRepository } from "./core/ports/adapters/outbound/campaign.irepository";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignController } from './adapters/inbound/controllers/campaign.controller';
import { CampaignService } from './core/services/campaign.service';
import { CampaignSQLRepository } from './adapters/outbound/repositories/campaign/campaign.sqlrepository';
import { Campaign, CampaignInteractionConglomerate, CampaignPlatform } from './core/domain/entities/campaign.entity';
import { IRepositoryTransactioner } from './core/ports/transactioner.irepository';
import { TypeormTransactioner } from './adapters/outbound/repositories/campaign.transactioner';
import { IInteractionTypeRepository } from './core/ports/adapters/outbound/itype.irepository';
import { InteractionTypeSQLRepository } from './adapters/outbound/repositories/interaction_type/itype.sqlrepository';
import { CampaignPlatformSQLRepository } from './adapters/outbound/repositories/campaign/cmppltfrm.sqlrepository';
import { IPlatformRepository } from './core/ports/adapters/outbound/platform.irepository';
import { PlatformSQLRepository } from './adapters/outbound/repositories/platform/platform.sqlrepository';
import { ICampaignPlatformRepository } from './core/ports/adapters/outbound/camppltfrm.irepository';
import { Platform } from './core/domain/entities/platform.entity';
import { InteractionType } from './core/domain/entities/itype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, CampaignPlatform, CampaignInteractionConglomerate, Platform, InteractionType])],
  controllers: [CampaignController],
  providers: [CampaignService, {
    provide: ICampaignRepository,
    useClass: CampaignSQLRepository
  },{
    provide: ICampaignService,
    useClass: CampaignService,
  },
  {
    provide: IInteractionTypeRepository,
    useClass: InteractionTypeSQLRepository,
  },{
    provide: ICampaignPlatformRepository,
    useClass: CampaignPlatformSQLRepository
  },
  {
    provide: IPlatformRepository,
    useClass: PlatformSQLRepository,
  },
  {
    provide: IRepositoryTransactioner,
    useClass: TypeormTransactioner,
  }],
})
export class CampaignModule {}