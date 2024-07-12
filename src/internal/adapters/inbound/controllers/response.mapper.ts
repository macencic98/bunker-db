import { CampaignResponse } from "src/internal/core/domain/dto/campaign.dto";
import { PlatformDTOResponse, PlatformInteractionMetricsDTO } from "src/internal/core/domain/dto/campaignpl.dto";
import { Campaign, CampaignInteractionConglomerate } from "src/internal/core/domain/models/campaign.model";
import { Platform } from "src/internal/core/domain/models/platform.model";

export class Mapper {
  static toCreateCampaignResponse(campaign: Campaign): CampaignResponse {
    return this.toCampaignResponse(campaign)
  }

  static toupdateCampaignResponse(campaign: Campaign): CampaignResponse {
    return this.toCampaignResponse(campaign)
  }

  static toSingleCampaignResponse(campaign: Campaign): CampaignResponse{
    return this.toCampaignResponse(campaign)
  }

  static toMultipleCampaignsResponse(campaigns: Campaign[]): CampaignResponse[]{
    let resp: CampaignResponse[] = new Array(campaigns.length)
    for(let i = 0; i < campaigns.length; i++){
      resp[i] = Mapper.toCampaignResponse(campaigns[i])
    }

    return resp
  }
  
  private static toCampaignResponse(campaign: Campaign): CampaignResponse {
    if(campaign == undefined){
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
    resp.platforms = platforms

    if (campaign.platforms != undefined) {
      platforms = campaign.platforms.map(platform =>
        Mapper.toPlatformDTOResponse(platform)
      );
    }

    return resp
  }

  static toPlatformDTOResponse(platform: Platform): PlatformDTOResponse {
    let interactions: PlatformInteractionMetricsDTO[]
    let resp: PlatformDTOResponse = new PlatformDTOResponse()
    resp.id = platform.id
    resp.name = platform.name
    resp.tag = platform.tag
    resp.interactions = interactions

    if (platform.campaignPlatforms != undefined) {
      interactions = platform.campaignPlatforms.map(campaignPlatform =>
        Mapper.toPlatformInteractionMetricsDTO(campaignPlatform.campInteractionConglomerate)
      );

      resp.platformBudget = platform.campaignPlatforms.reduce((acc, curr) => acc + curr.platformBudget, 0)
    }

    return resp
  }

  static toPlatformInteractionMetricsDTO(conglomerate: CampaignInteractionConglomerate): PlatformInteractionMetricsDTO {
    return {
      type: conglomerate.interactionType.name,
      quantity: conglomerate.quantity,
    };
  }
}