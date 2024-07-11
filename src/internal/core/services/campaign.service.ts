import { Inject, Injectable } from "@nestjs/common";
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

@Injectable()
export class CampaignService extends Error implements ICampaignService  {
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
    //constructor(readonly campaignRepository: ICampaignRepository) {}

    async create(dto: CreateCampaignDto): Promise<Campaign> {
        let newCampaign: Campaign = new Campaign(dto.totalBudget, dto.name, dto.startDate, dto.endDate)

        try{
            let newCampaignPlatforms: CampaignPlatform[] = await this.setCampaignPlatforms(newCampaign, dto.platforms)
        if(!this.isCampaignBudgetValid(newCampaign.totalBudget, this.calculateCurrentBudget(newCampaignPlatforms))){
            throw new Error("")
        }

        await this.transactioner.do(async (manager) => {
            newCampaign = await this.campaignRepository.create(newCampaign)
            for(let i = 0; i < newCampaignPlatforms.length; i++){
                await this.setCampaignPlatformConglomerate(newCampaignPlatforms[i])
                newCampaignPlatforms[i].campaign.id = newCampaign.id
                await this.campaignPlatformRepository.create(newCampaignPlatforms[i])
            }
        })

        return newCampaign
        }catch(err){

        }
    }

    async delete(id: number): Promise<Campaign> {
        try {
            let camp = await this.campaignRepository.findOneById(id);
            camp.updatedAt = new Date();
            return await this.campaignRepository.update(camp);
        } catch (error) {

        }
    }

    async findAll(): Promise<Campaign[]> {
        let campArr: Campaign[] = [];
        try {
            await this.campaignRepository.findAll();
        } catch (error) {

        } finally {
            return campArr;
        }
    }

    async update(campaign: UpdateCampaignDto): Promise<Campaign> {
        return new Campaign(0, "", null, null);
        try {
            //await this.campaignRepository.update(new Campaign());
        } catch (error) {

        } finally {
            //return new Campaign();
        }
    }

    async findOneById(id: number): Promise<Campaign> {
        try {
            return await this.campaignRepository.findOneById(id);
        } catch (error) {

        } finally {
            //return new Campaign();
        }
    }

    private calculateCurrentBudget(platforms: CampaignPlatformDto[]): number {
        let currentBudget: number = 0;
        platforms.forEach(element => {
            currentBudget += element.platformBudget
        });

        return currentBudget
    }

    private isCampaignBudgetValid(setBudget: number, currentBudget: number): boolean {
        return setBudget == currentBudget
    }

    private setCampaignPlatforms(campaign: Campaign, platforms: CampaignPlatformDto[]): CampaignPlatform[] {
        let campaignPlatforms: CampaignPlatform[] = new CampaignPlatform[platforms.length]
        platforms.forEach(async element => {
            let newCmpPlatform: CampaignPlatform = new CampaignPlatform(element.platformBudget)
            newCmpPlatform.campaign = campaign, newCmpPlatform.platform = new Platform("", "")
            newCmpPlatform.platform.id = element.id     
            campaignPlatforms.push(newCmpPlatform)
        });

        return campaignPlatforms
    }

    private async setCampaignPlatformConglomerate(campaignPlatform: CampaignPlatform): Promise<CampaignPlatform> {
        let platformInteractionTypes: InteractionType[] = await this.intTypeRepository.findByPlatform(campaignPlatform.platform.id)
        platformInteractionTypes.forEach(element => {
            campaignPlatform.campInteractionConglomerate = new CampaignInteractionConglomerate(0)
            campaignPlatform.campInteractionConglomerate.campaignPlatform = campaignPlatform 

            let itType: InteractionType =  new InteractionType(element.name, element.description)
            itType.id = element.id
            campaignPlatform.campInteractionConglomerate.interactionType = itType
        });

        return campaignPlatform
    }
}
