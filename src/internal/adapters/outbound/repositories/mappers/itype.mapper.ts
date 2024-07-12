import { InteractionType as InteractionTypeEntity } from '../../../../core/domain/entities/itype.entity';
import { InteractionType as InteractionTypeModel } from '../../../../core/domain/models/itype.model';
import { mapPlatformEntityToModel, mapPlatformModelToEntity } from './platform.mapper';

export function mapInteractionTypeEntityToModel(entity: InteractionTypeEntity): InteractionTypeModel {
    const model = new InteractionTypeModel(entity.name, entity.description);
    model.id = entity.id;
    if(model.platform != undefined){
        model.platform = mapPlatformEntityToModel(entity.platform);
    }
    
    return model;
}

export function mapInteractionTypeModelToEntity(model: InteractionTypeModel): InteractionTypeEntity {
    const entity = new InteractionTypeEntity();
    entity.id = model.id;
    entity.name = model.name;
    entity.description = model.description;
    entity.platform = mapPlatformModelToEntity(model.platform);
    return entity;
}