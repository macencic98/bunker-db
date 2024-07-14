import { Inject, Injectable, Logger } from "@nestjs/common";
import { CreateCampaignDto, UpdateCampaignDto } from './campaign.dto';
import { ICampaignService } from "./campaign.iservice";
import { ICampaignRepository } from "./campaign.irepository";
import { IPlatformRepository } from './platform/platform.irepository';
import { IRepositoryTransactioner } from "../transactioner/transactioner.irepository";
import { InvalidBudgetError } from "../exceptions/errors.model";
import { Campaign } from "./campaign.model";
import { CampaignPlatform } from "./campaign-platform/campaignplatform.model";
import { ICampaignPlatformService } from "./campaign-platform/campaignplt.iservice";
import { ICampaignConglomerateService } from "./campaign-conglomerate/campconglom.iservice";
import { Platform } from "./platform/platform.model";
import { CampaignPlatformDto } from "./campaign-platform/campaignpl.dto";

@Injectable()
export class CampaignService extends Error implements ICampaignService {
    constructor(
        @Inject(ICampaignRepository)
        readonly campaignRepository: ICampaignRepository,
        @Inject(IPlatformRepository)
        readonly platformRepository: IPlatformRepository,
        @Inject(ICampaignPlatformService)
        private readonly campaignPlatformService: ICampaignPlatformService,
    ) {
        super();
    }

    async create(dto: CreateCampaignDto): Promise<Campaign> {
        let newCampaign: Campaign = new Campaign()
        newCampaign.totalBudget = dto.totalBudget
        newCampaign.name = dto.name
        newCampaign.tag = dto.tag
        newCampaign.startDate = dto.startDate
        newCampaign.endDate = dto.endDate

        try {
            let newCampaignPlatforms: CampaignPlatform[] = await this.campaignPlatformService.buildCampaignPlatforms(newCampaign, dto.platforms)
            if (!this.isCampaignBudgetValid(newCampaign.totalBudget, this.calculateCurrentBudget(newCampaignPlatforms))) {
                throw new InvalidBudgetError("the campaign budget & platforms' budget does not coincide")
            }

           // await this.transactioner.do(async (manager) => {
                Logger.log(5)
                newCampaign.id = (await this.campaignRepository.create(newCampaign)).id
                //manager.save(newCampaign)
                Logger.log(6)
                for (let i = 0; i < newCampaignPlatforms.length; i++) {
                    newCampaignPlatforms[i].campaign = newCampaign
                    newCampaignPlatforms[i] = await this.campaignPlatformService.create(newCampaignPlatforms[i])        
                    Logger.log(9)
                }

                Logger.log(11)
           // });

            Logger.log(12)
            return newCampaign
        } catch (err) {
            Logger.log(err.stack)
            Logger.log(err.message)
            throw err

        }
    }

    async delete(id: number): Promise<Campaign> {
        try {
            let camp = await this.campaignRepository.findOneById(id);
            camp.updatedAt = new Date();
            return await this.campaignRepository.update(camp);
        } catch (error) {
            console.error("An error occurred:", error.message);
            throw error
        }
    }

    async findAll(): Promise<Campaign[]> {
        try {
            return await this.campaignRepository.findAll();
        } catch (error) {
            Logger.log(error)
            throw error
        }
    }

    async update(campaign: UpdateCampaignDto): Promise<Campaign> {
        let campaignToBeUpdated: Campaign = new Campaign()
        campaignToBeUpdated.name = campaign.name
        campaignToBeUpdated.startDate = campaign.startDate
        campaignToBeUpdated.endDate = campaign.endDate

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
            Logger.log(error + error.stack)
            throw error
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
}
