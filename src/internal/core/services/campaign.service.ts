import { Inject, Injectable, Logger } from "@nestjs/common";
import { CampaignPlatformDto, CreateCampaignDto, UpdateCampaignDto } from '../domain/dto/campaign.dto';
import { ICampaignService } from "../ports/campaign.iservice";
import { ICampaignRepository } from "../ports/adapters/outbound/campaign.irepository";
import { Campaign, CampaignInteractionConglomerate, CampaignPlatform } from "../domain/models/campaign.model";
import { IPlatformRepository } from '../ports/adapters/outbound/platform.irepository';
import { IRepositoryTransactioner } from "../ports/transactioner.irepository";
import { Platform } from "../domain/models/platform.model";
import { InteractionType } from "../domain/models/itype.model";
import { IInteractionTypeRepository } from "../ports/adapters/outbound/itype.irepository";
import { ICampaignPlatformRepository } from "../ports/adapters/outbound/camppltfrm.irepository";
import { InvalidBudgetError } from "./errors.model";

@Injectable()
export class CampaignService extends Error implements ICampaignService {
    constructor(
        @Inject(ICampaignRepository)
        readonly campaignRepository: ICampaignRepository,
        @Inject(IPlatformRepository)
        readonly platformRepository: IPlatformRepository,
        @Inject(IInteractionTypeRepository)
        private readonly intTypeRepository: IInteractionTypeRepository,
        @Inject(ICampaignPlatformRepository)
        private readonly campaignPlatformRepository: ICampaignPlatformRepository,
        @Inject(IRepositoryTransactioner)
        private readonly transactioner: IRepositoryTransactioner,
    ) {
        super();
    }

    async create(dto: CreateCampaignDto): Promise<Campaign> {
        let newCampaign: Campaign = new Campaign(dto.totalBudget, dto.name, dto.startDate, dto.endDate)

        try {
            Logger.log(1)
            let newCampaignPlatforms: CampaignPlatform[] = this.setCampaignPlatforms(newCampaign, dto.platforms)
            Logger.log(2)
            if (!this.isCampaignBudgetValid(newCampaign.totalBudget, this.calculateCurrentBudget(newCampaignPlatforms))) {
                Logger.log(newCampaign.totalBudget)
                Logger.log(this.calculateCurrentBudget(newCampaignPlatforms))
                //throw new InvalidBudgetError("the campaign budget & platforms' budget does not coincide")
            }

            Logger.log(3)
            for (let i = 0; i < newCampaignPlatforms.length; i++) {
                await this.setCampaignPlatformConglomerate(newCampaignPlatforms[i])
            }

            Logger.log(4)
            await this.transactioner.do(async (manager) => {
                Logger.log(5)
                newCampaign = await this.campaignRepository.create(newCampaign)
                manager.save(newCampaign)
                Logger.log(6)
                for (let i = 0; i < newCampaignPlatforms.length; i++) {
                    Logger.log(7)
                    newCampaignPlatforms[i].campaign.id = newCampaign.id
                    Logger.log(8)
                    await this.campaignPlatformRepository.create(newCampaignPlatforms[i])
                }
            });

            return newCampaign
        } catch (err) {
            Logger.log(err.message)
            if (err instanceof InvalidBudgetError) {
                throw err
            }
        }
    }

    async delete(id: number): Promise<Campaign> {
        try {
            let camp = await this.campaignRepository.findOneById(id);
            camp.updatedAt = new Date();
            return await this.campaignRepository.update(camp);
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    }

    async findAll(): Promise<Campaign[]> {
        try {
            return await this.campaignRepository.findAll();
        } catch (error) {
            Logger.log(error)
            throw new Error("there has been an error searching the Campaigns")
        }
    }

    async update(campaign: UpdateCampaignDto): Promise<Campaign> {
        let campaignToBeUpdated: Campaign = new Campaign(null, campaign.name, campaign.startDate, campaign.endDate)

        try {
            return await this.campaignRepository.update(campaignToBeUpdated);
        } catch (error) {
            Logger.log(error)
            throw new Error("there has been an error updating the Campaign")
        }
    }

    async findOneById(id: number): Promise<Campaign> {
        try {
            return await this.campaignRepository.findOneById(id);
        } catch (error) {
            Logger.log(error)
            throw new Error("there has been an error searching the campaign")
        }
    }

    private calculateCurrentBudget(platforms: CampaignPlatform[]): number {
        let currentBudget: number = 0;
        platforms.forEach(element => {
            currentBudget = element.platformBudget + currentBudget
        });

        return currentBudget
    }

    private isCampaignBudgetValid(setBudget: number, currentBudget: number): boolean {
        return setBudget == currentBudget
    }

    private setCampaignPlatforms(campaign: Campaign, platforms: CampaignPlatformDto[]): CampaignPlatform[] {
        let campaignPlatforms: CampaignPlatform[] = new Array(platforms.length)
        for(let idx = 0; idx < platforms.length; idx++){
            let newCmpPlatform: CampaignPlatform = new CampaignPlatform(platforms[0].platformBudget)
            newCmpPlatform.campaign = campaign
            newCmpPlatform.platform = new Platform("", "")
            newCmpPlatform.platform.id = platforms[0].id
            campaignPlatforms[idx] = newCmpPlatform
        }

        Logger.log( campaignPlatforms[0].platform.id)
        return campaignPlatforms
    }

    private async setCampaignPlatformConglomerate(campaignPlatform: CampaignPlatform): Promise<CampaignPlatform> {
        let platformInteractionTypes: InteractionType[] = await this.intTypeRepository.findByPlatform(campaignPlatform.platform.id)
        platformInteractionTypes.forEach(element => {
            campaignPlatform.campInteractionConglomerate = new CampaignInteractionConglomerate(0)

            let itType: InteractionType = new InteractionType(element.name, element.description)
            itType.id = element.id
            campaignPlatform.campInteractionConglomerate.interactionType = itType
        });

        return campaignPlatform
    }
}
