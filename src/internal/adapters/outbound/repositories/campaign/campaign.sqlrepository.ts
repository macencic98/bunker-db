import { Campaign } from '../../../../core/domain/models/campaign.model';
import { Campaign as CampaignEntity } from '../../../../core/domain/entities/campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ICampaignRepository } from 'src/internal/core/ports/adapters/outbound/campaign.irepository';
import { Injectable } from '@nestjs/common';
import { mapCampaignModelToEntity, mapCampaignEntityToModel } from '../mappers/campaign.mapper';

@Injectable()
export class CampaignSQLRepository implements ICampaignRepository {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<CampaignEntity>,
  ) {}

  async create(campaign: Campaign): Promise<Campaign> {
    try {
      let rs = await this.campaignRepository.insert(mapCampaignModelToEntity(campaign))
      campaign.id = rs.identifiers[0].id
    } catch(error) {
      //
    }

    return campaign
  }

  async findOneById(id: number): Promise<Campaign> {
    try {
      let cmp = await this.campaignRepository.findOneBy({id: id})
      return mapCampaignEntityToModel(cmp);
    } catch(error) {
      //
    }
  }

  async findAll(): Promise<Campaign[]> {
    try {
      let cmp: CampaignEntity[] = await this.campaignRepository.find()
      let array: Campaign[] = new Campaign[cmp.length]
      cmp.forEach(element => {
        array.push(mapCampaignEntityToModel(element))
      })

      return array
    } catch(error) {
      //
    }
  }

  async update(campaign: Campaign): Promise<Campaign> {
    try {
      return await this.campaignRepository.save(campaign);
    } catch(error) {
      //
    }
  }

}
