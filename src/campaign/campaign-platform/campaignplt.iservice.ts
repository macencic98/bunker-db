import { Campaign } from "../campaign.model";
import { CampaignPlatformDto } from "./campaignpl.dto";
import { CampaignPlatform } from "./campaignplatform.model";

export interface ICampaignPlatformService{
    buildCampaignPlatforms(campaign: Campaign, platforms: CampaignPlatformDto[]): Promise<CampaignPlatform[]>
    create(campaignPlatform: CampaignPlatform): Promise<CampaignPlatform>;
}

export const ICampaignPlatformService = Symbol('ICampaignPlatformService');
