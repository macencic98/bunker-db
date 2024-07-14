import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignInteractionConglomerate as CampaignInteractionConglomerateEntity } from "./campconglom.entity";
import { Repository } from "typeorm";
import { ICampaignConglomerateRepository } from "./cmpcongl.irepository";
import { CampaignInteractionConglomerate } from "./campintcongl.model";
import { mapCampaignIntModelToEntity } from "../../interaction/interactioncmp.mapper";
import { mapCampaignEntityToModel } from "../campaign.mapper";
import { MappingException, RepositoryException } from "src/exceptions/errors.model";

@Injectable()
export class CampaignConglomerateSQLRepository implements ICampaignConglomerateRepository {
    constructor(
        @InjectRepository(CampaignInteractionConglomerateEntity)
        private cmpConglRepo: Repository<CampaignInteractionConglomerateEntity>,
    ) { }

    async create(cmpIntCongl: CampaignInteractionConglomerate): Promise<CampaignInteractionConglomerate> {
        try{
            let entity: CampaignInteractionConglomerateEntity = mapCampaignIntModelToEntity(cmpIntCongl)
            let rs = await this.cmpConglRepo.insert(entity)
            cmpIntCongl.id = rs.identifiers[0].id
        }catch(error){
            Logger.log(error.message + error.stack, 'error')
            if(error instanceof MappingException){
                throw error
            }
            
            throw new RepositoryException("there has been an error storing the interactions")
        }
        
        return
    }

    async incrementQuantity(cmpIntCongl: CampaignInteractionConglomerate): Promise<CampaignInteractionConglomerate> {
        try{
            await this.cmpConglRepo.increment({
                campaignPlatform: {
                    campaign: {
                        tag: cmpIntCongl.campaignPlatform.campaign.tag,
                    },
                }, interactionType: { name: cmpIntCongl.interactionType.name },
            }, 'quantity', 1)
            return cmpIntCongl
        }
        catch(error){
            Logger.log(error.message + error.stack, 'error')
            if(error instanceof MappingException){
                throw error
            }
            throw new RepositoryException("there has been an error updating the interaction quantity")
        }
    }

}