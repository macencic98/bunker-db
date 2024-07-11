import { Module } from '@nestjs/common';


import { ICampaignPlatformRepository, ICampaignService } from './core/ports/campaign.iservice';

import { ICampaignRepository } from "./core/ports/adapters/outbound/campaign.irepository";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignController } from './adapters/inbound/controllers/campaign.controller';
import { CampaignService } from './core/services/campaign.service';
import { CampaignSQLRepository } from './adapters/outbound/repositories/campaign/campaign.sqlrepository';
import { Campaign } from './core/domain/models/campaign.model';
import { IRepositoryTransactioner } from './core/ports/transactioner.irepository';
import { Transactioner } from './adapters/outbound/repositories/campaign.transactioner';
import { IInteractionTypeRepository } from './core/ports/adapters/outbound/itype.irepository';
import { InteractionTypeSQLRepository } from './adapters/outbound/repositories/interaction_type/itype.sqlrepository';
import { CampaignPlatformSQLRepository } from './adapters/outbound/repositories/campaign/cmppltfrm.sqlrepository';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
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
    provide: IRepositoryTransactioner,
    useClass: Transactioner,
  }],
})
export class CampaignModule {}