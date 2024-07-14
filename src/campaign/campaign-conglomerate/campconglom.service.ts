import { Inject, Logger } from "@nestjs/common";

import { CampaignPlatform } from "../campaign-platform/campaignplatform.model";
import { ICampaignConglomerateRepository } from "./cmpcongl.irepository";
import { ICampaignConglomerateService } from "./campconglom.iservice";
import { CampaignInteractionConglomerate } from "./campintcongl.model";
import { InteractionType } from "../interaction-type/itype.model";
import { IInteractionTypeRepository } from "../interaction-type/itype.irepository";

export class CampaignConglomerateService implements ICampaignConglomerateService{
    constructor(
        @Inject(ICampaignConglomerateRepository)
        private readonly campaignConglRepository: ICampaignConglomerateRepository,
        @Inject(IInteractionTypeRepository)
        private readonly intTypeRepository: IInteractionTypeRepository
    ) {
        
    }

    public async createBulkConglomerates(campIntConglomerates: CampaignInteractionConglomerate[]): Promise<void> {
        try{
            for(let i = 0; i < campIntConglomerates.length; i++){
                await this.campaignConglRepository.create(campIntConglomerates[i]);
            }
        }catch(error){
            Logger.log(error.message, "error")
            throw error
        }
    }

    public async create(campIntConglomerate: CampaignInteractionConglomerate): Promise<CampaignInteractionConglomerate> {
        try{
            campIntConglomerate.id = (await this.campaignConglRepository.create(campIntConglomerate)).id;
            return campIntConglomerate
        }catch(error){
            Logger.log(error.message, "error")
            throw error
        }
    }

    public async buildConglomerates(campaignPlatform: CampaignPlatform): Promise<CampaignInteractionConglomerate[]> {
        let platformInteractionTypes: InteractionType[] = await this.intTypeRepository.findByPlatform(campaignPlatform.platform.id)
        if(platformInteractionTypes == null){
            return []
        }

        let campaignConglomerates: CampaignInteractionConglomerate[] = new Array(platformInteractionTypes.length)
        
        for(let idx = 0; idx < platformInteractionTypes.length; idx ++){
            let newConglomerate: CampaignInteractionConglomerate = new CampaignInteractionConglomerate(0)
            newConglomerate.interactionType = new InteractionType()
            newConglomerate.interactionType.name = platformInteractionTypes[idx].name
            newConglomerate.interactionType.description = platformInteractionTypes[idx].description
            newConglomerate.interactionType.id = platformInteractionTypes[idx].id
            newConglomerate.campaignPlatform = campaignPlatform
            campaignConglomerates[idx] = newConglomerate
        }

        return campaignConglomerates
    }
}