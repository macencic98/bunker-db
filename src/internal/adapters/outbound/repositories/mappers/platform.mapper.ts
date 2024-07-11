import { Platform as PlatformEntity } from '../../../../core/domain/entities/platform.entity';
import { Platform as PlatformModel } from '../../../../core/domain/models/platform.model';
import { mapCampaignPlatformEntityToModel, mapCampaignPlatformModelToEntity } from './cmpplatform.mapper';
import { mapInteractionTypeEntityToModel, mapInteractionTypeModelToEntity } from './itype.mapper';

export function mapPlatformEntityToModel(entity: PlatformEntity): PlatformModel {
    const model = new PlatformModel(entity.name, entity.tag, entity.description);
    model.id = entity.id;
    model.interactionTypes = entity.interactionTypes.map(mapInteractionTypeEntityToModel);
    model.campaignPlatforms = entity.campaignPlatforms.map(mapCampaignPlatformEntityToModel);
    return model;
}

export function mapPlatformModelToEntity(model: PlatformModel): PlatformEntity {
    const entity = new PlatformEntity();
    entity.id = model.id;
    entity.name = model.name;
    entity.tag = model.tag;
    entity.description = model.description;
    entity.interactionTypes = model.interactionTypes.map(mapInteractionTypeModelToEntity);
    entity.campaignPlatforms = model.campaignPlatforms.map(mapCampaignPlatformModelToEntity);
    return entity;
}
