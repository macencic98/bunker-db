import { CreateCampaignDto, UpdateCampaignDto } from "./campaign.dto";
import { Campaign } from "./campaign.model";

export interface ICampaignService{
    create(campaign: CreateCampaignDto): Promise<Campaign>;
    delete(id: number): Promise<Campaign>;
    findAll(): Promise<Campaign[]>;
    update(campaign: UpdateCampaignDto): Promise<Campaign>;
    findOneById(id: number): Promise<Campaign>;
}

export const ICampaignService = Symbol('ICampaignService');