import { Inject, Injectable, Logger } from "@nestjs/common"
import { ICampaignPlatformRepository } from "./camppltfrm.irepository"
import { ICampaignPlatformService } from "./campaignplt.iservice"
import { Campaign } from "../campaign.model"
import { CampaignPlatformDto } from "./campaignpl.dto"
import { CampaignPlatform } from "./campaignplatform.model"
import { Platform } from "../platform/platform.model"
import { CreateCampaignDto } from "../campaign.dto"
import { ICampaignConglomerateService } from "../campaign-conglomerate/campconglom.iservice"
@Injectable()
export class CampaignPlatformService extends Error implements ICampaignPlatformService {
    constructor(
        @Inject(ICampaignPlatformRepository)
        private readonly campaignPlatformRepository: ICampaignPlatformRepository,
        @Inject(ICampaignConglomerateService)
        private readonly cmpIntConglomerateService: ICampaignConglomerateService,
    ) {
        super();
    }

    public async buildCampaignPlatforms(campaign: Campaign, platforms: CampaignPlatformDto[]): Promise<CampaignPlatform[]> {
        let campaignPlatforms: CampaignPlatform[] = new Array(platforms.length)
        for (let idx = 0; idx < platforms.length; idx++) {
            let newCmpPlatform: CampaignPlatform = new CampaignPlatform(platforms[idx].platformBudget)
            newCmpPlatform.campaign = campaign
            newCmpPlatform.platform = new Platform()
            newCmpPlatform.platform.id = platforms[idx].id
            newCmpPlatform.setCampInteractionConglomerates(await this.cmpIntConglomerateService.buildConglomerates(newCmpPlatform))

            campaignPlatforms[idx] = newCmpPlatform
        }

        return campaignPlatforms
    }

    public async create(campaignPlatform: CampaignPlatform): Promise<CampaignPlatform> {
        try{
            campaignPlatform.id = (await this.campaignPlatformRepository.create(campaignPlatform)).id;
            for(let idx = 0; idx < campaignPlatform.campInteractionConglomerates.length; idx++){
                campaignPlatform.campInteractionConglomerates[idx].campaignPlatform = campaignPlatform
                this.cmpIntConglomerateService.create(campaignPlatform.campInteractionConglomerates[idx])
            }

            return campaignPlatform
        }catch(error){
            Logger.log(error.message, 'error')
            throw error
        }
    }
}