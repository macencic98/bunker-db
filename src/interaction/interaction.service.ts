import { Inject, Injectable, Logger } from "@nestjs/common";
import { IInteractionService } from "./interactions.iservice";
import { CreateInteractionDTO } from "./interaction.dto";
import { Interaction } from "./interaction.model";
import { Platform } from "../campaign/platform/platform.model";
import { InteractionType } from "../campaign/interaction-type/itype.model";
import { UserData } from "../campaign/userdata.model";
import { v4 as uuid } from 'uuid';
import { IInteractionRepository } from "./interactions.irepository";
import { ICampaignConglomerateRepository } from "../campaign/campaign-conglomerate/cmpcongl.irepository";
import { Campaign } from "../campaign/campaign.model";
import { CampaignInteractionConglomerate } from "../campaign/campaign-conglomerate/campintcongl.model";
import { CampaignPlatform } from "../campaign/campaign-platform/campaignplatform.model";
import { MsgListenerDTO, MsgProdDTO } from "./msg.dto";
import { IMessageListenerService, IMessageProducerService } from "./msgprod.interface";

@Injectable()
export class InteractionService extends Error implements IInteractionService {
    constructor(
        @Inject(IInteractionRepository)
        private readonly interactionRepository: IInteractionRepository,
        @Inject(ICampaignConglomerateRepository)
        private readonly conglomerateRepo: ICampaignConglomerateRepository,
        @Inject(IMessageProducerService)
        private readonly intMessService: IMessageProducerService<Interaction>,
        @Inject(IMessageListenerService)
        private readonly listenerService: IMessageListenerService<Interaction>,) {
        super();
    }


    async create(interactionDto: CreateInteractionDTO): Promise<Interaction> {
        try {
            let interaction: Interaction = this.setInteractionCreationInfo(interactionDto)
            await this.interactionRepository.create(interaction)

            let campaignConglomerate: CampaignInteractionConglomerate = new CampaignInteractionConglomerate(0)
            campaignConglomerate.interactionType = interaction.interactionType
            campaignConglomerate.campaignPlatform = new CampaignPlatform(0)
            campaignConglomerate.campaignPlatform.campaign = interaction.campaign

            await this.conglomerateRepo.incrementQuantity(campaignConglomerate)
            //await this.intMessService.sendEvent(new MsgProdDTO<Interaction>(interaction))
            return interaction;
        } catch (error) {
            throw error
        }
    }

    private setInteractionCreationInfo(interactionDto: CreateInteractionDTO): Interaction{
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
        interaction.id = uuid()
        interaction.campaign = campaign
        interaction.userData = userData

        return interaction
    }

    async handleInteractionEvent(dto: MsgListenerDTO<Interaction>): Promise<Interaction>{
        await this.listenerService.handleMessage(dto)
        let intEvent: Interaction = dto.data
        Logger.log("event listened to: " + JSON.stringify(intEvent) )
        return new Interaction()
    }
}