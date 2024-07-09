import { CreateCampaignDto } from "./campaign.dto";
import { Campaign } from "./campaign.entity";

export interface ICampaignService{
    create(d: CreateCampaignDto);
    delete();
    list();
    update();
    findOne(id: number): Promise<Campaign>;
}