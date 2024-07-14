import { Platform, Platform as PlatformModel } from './platform.model';
import { Platform as PlatformEntity } from './platform.entity';
import { mapCampaignPlatformEntityToModel, mapCampaignPlatformModelToEntity } from '../campaign-platform/cmpplatform.mapper';
import { mapInteractionTypeEntityToModel, mapInteractionTypeModelToEntity } from '../interaction-type/itype.mapper';
import { map } from 'rxjs';
import { MappingException } from 'src/exceptions/errors.model';
import { Logger } from '@nestjs/common';

export function mapPlatformEntityToModel(entity: PlatformEntity): PlatformModel {
    try {
        if (entity == null) {
            return null
        }
        const model = new PlatformModel();
        model.name = entity.name
        model.tag = entity.tag
        model.description = entity.description
        model.id = entity.id;

        if (entity.interactionTypes != null) {
            model.interactionTypes = new Array()
            entity.interactionTypes.forEach(element => {
                model.interactionTypes.push(mapInteractionTypeEntityToModel(element))
            });
        }

        return model;
    } catch (error) {
        Logger.log(error.message, 'error')
        throw new MappingException("there has been an error mapping platform")
    }

}

export function mapPlatformModelToEntity(model: PlatformModel): PlatformEntity {
    try {
        const entity = new PlatformEntity();
        entity.id = model.id;
        entity.name = model.name;
        entity.tag = model.tag;
        entity.description = model.description;
        if (model.interactionTypes != null) {
            model.interactionTypes = new Array(model.interactionTypes.length)
            for (let i = 0; i < model.interactionTypes.length; i++) {
                entity.interactionTypes[i] = mapInteractionTypeModelToEntity(model.interactionTypes[i])
            }
        }
        return entity;
    }catch (error) {
        Logger.log(error.message, 'error')
        throw new MappingException("there has been an error mapping platform")
    }

}
