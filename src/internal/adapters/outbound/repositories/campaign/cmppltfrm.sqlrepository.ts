import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { CampaignPlatform } from "src/internal/core/domain/entities/campaign.entity"
import { Campaign, CampaignPlatform as CampaignPlatformModel } from "src/internal/core/domain/models/campaign.model"
import { ICampaignPlatformRepository } from "src/internal/core/ports/campaign.iservice"
import { Repository } from "typeorm"
import { mapCampaignPlatformModelToEntity } from "../mappers/cmpplatform.mapper"

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
      //
    }

    return campaignPl
  }
}
