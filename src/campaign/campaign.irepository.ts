import { Campaign } from "./campaign.model";

export interface ICampaignRepository{
    create(campaign: Campaign): Promise<Campaign>;
    findOneById(id: number): Promise<Campaign>;
    findAll(): Promise<Campaign[]>;
    update(campaign: Partial<Campaign>): Promise<Partial<Campaign>>;
}

export const ICampaignRepository = Symbol('ICampaignRepository');