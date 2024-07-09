import { Campaign } from "./campaign.entity";

export interface ICampaignRepository{
    create(): Promise<Campaign>;
}