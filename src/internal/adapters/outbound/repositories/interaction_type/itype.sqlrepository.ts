import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Campaign } from '../../../../core/domain/models/campaign.model';
import { Campaign as CampaignEntity} from '../../../../core/domain/entities/campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { IInteractionTypeRepository } from '../../../../core/ports/adapters/outbound/itype.irepository';
import { InteractionType } from '../../../../core/domain/models/itype.model';
import { InteractionType as InteractionTypeEntity } from '../../../../core/domain/entities/itype.entity';
import { mapInteractionTypeEntityToModel, mapInteractionTypeModelToEntity } from '../mappers/itype.mapper';

@Injectable()
export class InteractionTypeSQLRepository implements IInteractionTypeRepository {
  constructor(
    @InjectRepository(InteractionTypeEntity)
    private iTypeRepository: Repository<InteractionTypeEntity>,
  ) {}

    async create(iType: InteractionType): Promise<InteractionType> {
        await this.iTypeRepository.insert(mapInteractionTypeModelToEntity(iType));
        return iType
    }

    async findOneById(id: number): Promise<InteractionType> {
        let interactionType: InteractionTypeEntity = await this.iTypeRepository.findOneBy({id: id})
        return mapInteractionTypeEntityToModel(interactionType)
    }

    async findByPlatform(id: number): Promise<InteractionType[]> {
        let interactionTypes: InteractionTypeEntity[] = await this.iTypeRepository.findBy({platform: {id: id}})
        let interactionModels: InteractionType[] = new Array(interactionTypes.length);
        for(let idx = 0; idx < interactionTypes.length; idx++){
            interactionModels[idx] = mapInteractionTypeEntityToModel(interactionTypes[idx])
        }
        
        return interactionModels
    }

}
