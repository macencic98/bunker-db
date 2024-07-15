import { CampaignResponse } from "./campaign.dto";
import { PlatformDTOResponse, PlatformInteractionMetricsDTO } from "./campaign-platform/campaignpl.dto";
import { Campaign } from "./campaign.model";
import { CampaignInteractionConglomerate } from "./campaign-conglomerate/campintcongl.model";
import { CampaignPlatform } from "./campaign-platform/campaignplatform.model";
import { log } from 'console';
import { MappingException } from "src/exceptions/errors.model";
import { Logger } from "@nestjs/common";


export class Mapper {
  static toCreateCampaignResponse(campaign: Campaign): CampaignResponse {
    return this.toCampaignResponse(campaign)
  }

  static toupdateCampaignResponse(campaign: Campaign): CampaignResponse {
    return this.toCampaignResponse(campaign)
  }

  static toSingleCampaignResponse(campaign: Campaign): CampaignResponse {
    return this.toCampaignResponse(campaign)
  }

  static toMultipleCampaignsResponse(campaigns: Campaign[]): CampaignResponse[] {
    if (campaigns == null) {
      return []
    }
    let resp: CampaignResponse[] = new Array(campaigns.length)
    for (let i = 0; i < campaigns.length; i++) {
      resp[i] = Mapper.toCampaignResponse(campaigns[i])
    }

    return resp
  }

  private static toCampaignResponse(campaign: Campaign): CampaignResponse {
    try {
      if (campaign == null) {
        return null
      }

      let platforms: PlatformDTOResponse[]
      let resp: CampaignResponse = new CampaignResponse()
      resp.name = campaign.name
      resp.totalBudget = campaign.totalBudget
      resp.endDate = campaign.endDate
      resp.startDate = campaign.startDate
      resp.createdAt = campaign.createdAt
      resp.updatedAt = campaign.updatedAt
      

      if (campaign.campaignPlatforms != null) {
        platforms = new Array(campaign.campaignPlatforms.length)
        for(let i = 0; i < campaign.campaignPlatforms.length; i++){
          platforms[i] = Mapper.toPlatformDTOResponse(campaign.campaignPlatforms[i])
        }
  
        resp.platforms = platforms
      }

      return resp
    } catch (error) {
      Logger.log(error.message + error.stack, 'error')
      throw new MappingException("there has been an error mapping info")
    }

  }

  static toPlatformDTOResponse(cmpPlatform: CampaignPlatform): PlatformDTOResponse {
    try {
      if (cmpPlatform == null || cmpPlatform.campInteractionConglomerates == null) {
        return null
      }

      let resp: PlatformDTOResponse = new PlatformDTOResponse()
      resp.id = cmpPlatform.platform.id
      resp.name = cmpPlatform.platform.name
      resp.tag = cmpPlatform.platform.tag
      resp.platformBudget = cmpPlatform.platformBudget

      if(cmpPlatform.campInteractionConglomerates != null){
        let interactions: PlatformInteractionMetricsDTO[] = new Array(cmpPlatform.campInteractionConglomerates.length)
        for (let i = 0; i < cmpPlatform.campInteractionConglomerates.length; i++) {
          interactions[i] = Mapper.toPlatformInteractionMetricsDTO(cmpPlatform.campInteractionConglomerates[i])
        }
        resp.interactions = interactions
      }

      return resp
    } catch (error) {
      Logger.log(error.message + error.stack, 'error')
      throw new MappingException("there has been an error mapping info")
    }
  }

  static toPlatformInteractionMetricsDTO(conglomerate: CampaignInteractionConglomerate): PlatformInteractionMetricsDTO {
    return {
      type: conglomerate.interactionType.name,
      quantity: conglomerate.quantity,
    };
  }
}