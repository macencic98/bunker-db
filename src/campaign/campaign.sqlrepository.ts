
import { Campaign as CampaignEntity } from './campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { mapCampaignModelToEntity, mapCampaignEntityToModel } from './campaign.mapper';
import { ICampaignRepository } from './campaign.irepository';
import { Campaign } from './campaign.model';
import { MappingException, RepositoryException } from 'src/exceptions/errors.model';

@Injectable()
export class CampaignSQLRepository implements ICampaignRepository {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<CampaignEntity>,
  ) { }

  async create(campaign: Campaign): Promise<Campaign> {
    try {
      let rs = await this.campaignRepository.insert(mapCampaignModelToEntity(campaign))
      campaign.id = rs.identifiers[0].id
    } catch (error) {
      Logger.log(error.message, "error")
      if(error instanceof MappingException){
        throw error
      }

      if(error.message.includes('Duplicate')){
        throw new RepositoryException("duplicate campaign key for tag/name")
      }
      throw new RepositoryException("there has been an error storing the campaign")
    }

    return campaign
  }

  async findOneById(id: number): Promise<Campaign> {
    try {
      let cmp = await this.campaignRepository.findOne({
        where: {
          id: id,
        }, relations: {
          platforms: {
            platform: true,
            interactionConglomerates: {
              interactionType: true,
            },
          }
        }
      })
      
      if(cmp == null){
         return null
      }
      Logger.log(JSON.stringify(cmp))
      Logger.log(JSON.stringify(mapCampaignEntityToModel(cmp)))
      return mapCampaignEntityToModel(cmp);
    } catch (error) {
      Logger.log(error.message, "error")
      if(error instanceof MappingException){
        throw error
      }
      throw new RepositoryException("there has been an error finding the campaign")
    }
  }

  async findAll(): Promise<Campaign[]> {
    try {
      let cmp: CampaignEntity[] = await this.campaignRepository.find({
        relations: {
          platforms: {
            platform: true,
            interactionConglomerates: {
              interactionType: true
            },
          }
        }
      })
      let array: Campaign[] = new Array(cmp.length);
      for (let i = 0; i < cmp.length; i++) {
        array[i] = mapCampaignEntityToModel(cmp[i])
      }

      return array
    } catch (error) {
      Logger.log(error.message, "error")
      if(error instanceof MappingException){
        throw error
      }
      throw new RepositoryException("there has been an error finding the campaigns")
    }
  }

  async update(campaign: Campaign): Promise<Campaign> {
    try {
      return await this.campaignRepository.save(campaign);
    } catch (error) {
      Logger.log(error.message, "error")
      if(error instanceof MappingException){
        throw error
      }
      throw new RepositoryException("there has been an error updating the campaign")
      //
    }
  }

}
