import { CampaignPlatform } from "src/internal/core/domain/models/campaign.model";

export interface ICampaignPlatformRepository{
    create(campaign: CampaignPlatform): Promise<CampaignPlatform>;
}

export const ICampaignPlatformRepository = Symbol('ICampaignPlatformRepository');