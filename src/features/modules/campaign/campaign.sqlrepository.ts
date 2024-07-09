import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Campaign } from './campaign.entity';

@Injectable()
export class CampaignSQLRepository {
    async create(): Promise<Campaign> {
        return new Campaign;
      }
}