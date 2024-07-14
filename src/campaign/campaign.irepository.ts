import { Campaign } from "./campaign.model";

export interface ICampaignRepository{
    create(campaign: Campaign): Promise<Campaign>;
    findOneById(id: number): Promise<Campaign>;
    findAll(): Promise<Campaign[]>;
    update(campaign: Campaign): Promise<Campaign>;
}

export const ICampaignRepository = Symbol('ICampaignRepository');