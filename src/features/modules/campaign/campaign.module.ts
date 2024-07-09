import { Module } from '@nestjs/common';
import { Campaign } from './campaign.entity';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { CampaignSQLRepository } from './campaign.sqlrepository';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignSQLRepository],
})
export class CampaignModule {}