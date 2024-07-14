import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InteractionType } from './itype.model';
import { InteractionType as InteractionTypeEntity } from './itype.entity';
import { IInteractionTypeRepository } from './itype.irepository';
import { mapInteractionTypeEntityToModel, mapInteractionTypeModelToEntity } from './itype.mapper';
import { RepositoryException } from 'src/exceptions/errors.model';

@Injectable()
export class InteractionTypeSQLRepository implements IInteractionTypeRepository {
    constructor(
        @InjectRepository(InteractionTypeEntity)
        private iTypeRepository: Repository<InteractionTypeEntity>,
    ) { }

    async create(iType: InteractionType): Promise<InteractionType> {
        try {
            await this.iTypeRepository.insert(mapInteractionTypeModelToEntity(iType));
        } catch (error) {
            Logger.log(error.message, 'error')
            throw new RepositoryException("there has been an error creating the int type")
        }

        return iType
    }

    async findOneById(id: number): Promise<InteractionType> {
        try {
            let interactionType: InteractionTypeEntity = await this.iTypeRepository.findOneBy({ id: id })
            return mapInteractionTypeEntityToModel(interactionType)
        } catch (error) {
            Logger.log(error.message, 'error')
            throw new RepositoryException("there has been an error finding the int type")
        }
    }

    async findByPlatform(id: number): Promise<InteractionType[]> {
        try {
            let interactionTypes: InteractionTypeEntity[] = await this.iTypeRepository.findBy({ platform: { id: id } })
            let interactionModels: InteractionType[] = new Array(interactionTypes.length);
            for (let idx = 0; idx < interactionTypes.length; idx++) {
                interactionModels[idx] = mapInteractionTypeEntityToModel(interactionTypes[idx])
            }

            return interactionModels
        } catch (error) {
            Logger.log(error.message, 'error')
            throw new RepositoryException("there has been an error finding the int types by platform")
        }
    }
}
