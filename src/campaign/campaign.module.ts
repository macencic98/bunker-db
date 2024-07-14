import { TypeOrmModule } from "@nestjs/typeorm";
import { Campaign } from "./campaign.entity";
import { Module } from "@nestjs/common";
import { CampaignController } from "./campaign.controller";
import { CampaignService } from "./campaign.service";
import { ICampaignRepository } from "./campaign.irepository";
import { CampaignSQLRepository } from "./campaign.sqlrepository";
import { ICampaignService } from "./campaign.iservice";
import { TransactionerModule } from "src/transactioner/transactioner.module";
import { ICampaignPlatformRepository } from "./campaign-platform/camppltfrm.irepository";
import { CampaignPlatformSQLRepository } from "./campaign-platform/cmppltfrm.sqlrepository";
import { IInteractionTypeRepository } from "./interaction-type/itype.irepository";
import { InteractionTypeSQLRepository } from "./interaction-type/itype.sqlrepository";
import { IPlatformRepository } from "./platform/platform.irepository";
import { PlatformSQLRepository } from "./platform/platform.sqlrepository";
import { ICampaignPlatformService } from "./campaign-platform/campaignplt.iservice";
import { CampaignPlatformService } from "./campaign-platform/campaignpltfrm.service";
import { CampaignPlatform } from "./campaign-platform/campaignplatform.entity";
import { Platform } from "./platform/platform.entity";
import { CampaignInteractionConglomerate } from "./campaign-conglomerate/campconglom.entity";
import { InteractionType } from "./interaction-type/itype.entity";
import { ICampaignConglomerateRepository } from "./campaign-conglomerate/cmpcongl.irepository";
import { CampaignConglomerateSQLRepository } from "./campaign-conglomerate/campconglom.sqlrepository";
import { ICampaignConglomerateService } from "./campaign-conglomerate/campconglom.iservice";
import { CampaignConglomerateService } from "./campaign-conglomerate/campconglom.service";

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, CampaignPlatform, Platform, CampaignInteractionConglomerate, InteractionType]), TransactionerModule],
  controllers: [CampaignController],
  providers: [{
      provide: ICampaignRepository,
      useClass: CampaignSQLRepository
    },
    {
      provide: ICampaignPlatformRepository,
      useClass: CampaignPlatformSQLRepository
    },
    {
      provide: ICampaignConglomerateRepository,
      useClass: CampaignConglomerateSQLRepository
    },
    {
      provide: IInteractionTypeRepository,
      useClass: InteractionTypeSQLRepository
    },
    {
      provide: IPlatformRepository,
      useClass: PlatformSQLRepository
    },
     {
      provide: ICampaignService,
      useClass: CampaignService,
    },
    {
      provide: ICampaignPlatformService,
      useClass: CampaignPlatformService,
    },{
      provide: ICampaignConglomerateService,
      useClass: CampaignConglomerateService,
    },],
  exports: [ 
    CampaignModule, ICampaignConglomerateRepository
  ],
})

export class CampaignModule {}