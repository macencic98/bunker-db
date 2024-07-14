import { Inject, Injectable } from "@nestjs/common";
import { IInteractionService } from "./interactions.iservice";
import { CreateInteractionDTO } from "./interaction.dto";
import { Interaction } from "./interaction.model";
import { Platform } from "../campaign/platform/platform.model";
import { InteractionType } from "../campaign/interaction-type/itype.model";
import { UserData } from "../campaign/userdata.model";
import { v4 as uuid } from 'uuid';
import { IInteractionRepository } from "./interactions.irepository";
import { IMessageService } from "../message-dispatcher/msgdisp.interface";
import { ICampaignConglomerateRepository } from "../campaign/campaign-conglomerate/cmpcongl.irepository";
import { Campaign } from "../campaign/campaign.model";
import { CampaignInteractionConglomerate } from "../campaign/campaign-conglomerate/campintcongl.model";
import { CampaignPlatform } from "../campaign/campaign-platform/campaignplatform.model";
import { log } from 'console';

@Injectable()
export class InteractionService extends Error implements IInteractionService {
    constructor(
        @Inject(IInteractionRepository)
        private readonly interactionRepository: IInteractionRepository,
        @Inject(ICampaignConglomerateRepository)
        private readonly conglomerateRepo: ICampaignConglomerateRepository,
        @Inject(IMessageService)
        private readonly intMessService: IMessageService<Interaction>) {
        super();
    }


    async create(interactionDto: CreateInteractionDTO): Promise<Interaction> {
        try {
            let interaction: Interaction = new Interaction()
            let campaign: Campaign = new Campaign()
            campaign.tag = interactionDto.campaignTag

            let platform: Platform = new Platform()
            platform.tag = interactionDto.platformTag

            let iType: InteractionType = new InteractionType()
            iType.name = interactionDto.interactionTypeTag
            iType.platform = platform

            let userData: UserData = new UserData(interactionDto.userData.id)
            userData.metadata = interactionDto.userData.additionalProperties

            interaction.interactionType = iType
            interaction.id = uuid.generateId()
            interaction.campaign = campaign
            interaction.userData = userData
            await this.interactionRepository.create(interaction)

            let campaignConglomerate: CampaignInteractionConglomerate = new CampaignInteractionConglomerate(0)
            campaignConglomerate.interactionType = iType
            campaignConglomerate.campaignPlatform = new CampaignPlatform(0)
            campaignConglomerate.campaignPlatform.campaign = campaign

            await this.conglomerateRepo.incrementQuantity(campaignConglomerate)
            await this.intMessService.sendEvent(interaction)
            return interaction;
        } catch (error) {
            throw error
        }
    }

}