import { mapPlatformEntityToModel, mapPlatformModelToEntity } from "../platform/platform.mapper";
import { InteractionType } from "./itype.entity";
import { InteractionType as InteractionTypeModel } from "./itype.model";

export function mapInteractionTypeEntityToModel(entity: InteractionType): InteractionTypeModel {
    const model = new InteractionTypeModel();
    model.name = entity.name
    model.description = entity.description
    model.id = entity.id;
    /*if(model.platform != null){
        model.platform = mapPlatformEntityToModel(entity.platform);
    }*/
    
    return model;
}

export function mapInteractionTypeModelToEntity(model: InteractionTypeModel): InteractionType {
    const entity = new InteractionType();
    entity.id = model.id;
    entity.name = model.name;
    entity.description = model.description;
    /*if(model.platform != null){
        entity.platform = mapPlatformModelToEntity(model.platform);
    }*/
    
    return entity;
}