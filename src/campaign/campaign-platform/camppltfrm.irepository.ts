import { CampaignPlatform } from "./campaignplatform.model";

export interface ICampaignPlatformRepository{
    create(campaign: CampaignPlatform): Promise<CampaignPlatform>;
}

export const ICampaignPlatformRepository = Symbol('ICampaignPlatformRepository');