import { CreateCampaignDto, UpdateCampaignDto } from "../domain/dto/campaign.dto";
import { Campaign, CampaignPlatform } from "../domain/models/campaign.model";


export interface ICampaignService{
    create(campaign: CreateCampaignDto): Promise<Campaign>;
    delete(id: number): Promise<Campaign>;
    findAll(): Promise<Campaign[]>;
    update(campaign: UpdateCampaignDto): Promise<Campaign>;
    findOneById(id: number): Promise<Campaign>;
}

export const ICampaignService = Symbol('ICampaignService');

export interface ICampaignPlatformRepository{
    create(campaign: CampaignPlatform): Promise<CampaignPlatform>;
}

export const ICampaignPlatformRepository = Symbol('ICampaignPlatformRepository');