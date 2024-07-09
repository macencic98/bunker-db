import { Injectable } from "@nestjs/common";
import { CreateCampaignDto } from "./campaign.dto";
import { ICampaignService } from "./campaign.iservice";
import { ICampaignRepository } from "./campaign.irepository";
import { Campaign } from "./campaign.entity";

@Injectable()
export class CampaignService implements ICampaignService{
    constructor(private readonly campaignRepository: ICampaignRepository) {}

    async create(campaign: CreateCampaignDto): Promise<Campaign> {
        let campaignEntity: Campaign = new Campaign();

        return campaignEntity;
      }

    delete() {
        throw new Error("Method not implemented.");
    }
    list() {
        throw new Error("Method not implemented.");
    }
    
    update() {
        throw new Error("Method not implemented.");
    }

    async findOne(id: number): Promise<Campaign>{

        return new Campaign();
    }
}
