import { Injectable, Logger } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { CampaignPlatform } from "../campaign-platform/campaignplatform.entity"
import { CampaignPlatform as CampaignPlatformModel } from "../campaign-platform/campaignplatform.model"
import { Repository } from "typeorm"
import { mapCampaignPlatformModelToEntity } from "./cmpplatform.mapper"
import { ICampaignPlatformRepository } from "./camppltfrm.irepository"
import { MappingException, RepositoryException } from "src/exceptions/errors.model"

@Injectable()
export class CampaignPlatformSQLRepository implements ICampaignPlatformRepository {
  constructor(
    @InjectRepository(CampaignPlatform)
    private campaignPlRepository: Repository<CampaignPlatform>,
  ) {}

  async create(campaignPl: CampaignPlatformModel): Promise<CampaignPlatformModel> {
   try {
      let rs = await this.campaignPlRepository.insert(mapCampaignPlatformModelToEntity(campaignPl))
      campaignPl.id = rs.identifiers[0].id
    } catch(error) {
      Logger.log(error.message + error.stack, 'error')
      if(error instanceof MappingException){
        throw error
      }

      throw new RepositoryException(error.message)
    }

    return campaignPl
  }
}
