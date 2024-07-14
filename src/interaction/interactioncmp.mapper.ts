import { mapInteractionTypeEntityToModel, mapInteractionTypeModelToEntity } from '../campaign/interaction-type/itype.mapper';
import { CampaignInteractionConglomerate as CampaignIntCongEntity } from '../campaign/campaign-conglomerate/campconglom.entity';
import { CampaignInteractionConglomerate as CampaignIntModel } from '../campaign/campaign-conglomerate/campintcongl.model';
import { mapCampaignPlatformEntityToModel, mapCampaignPlatformModelToEntity } from '../campaign/campaign-platform/cmpplatform.mapper';


export function mapCampaignIntCongEntityToModel(entity: CampaignIntCongEntity): CampaignIntModel {
    const model = new CampaignIntModel(entity.quantity);
    model.id = entity.id;

    if(entity.interactionType != null){
        model.interactionType = mapInteractionTypeEntityToModel(entity.interactionType);
    }
    
    if(entity.campaignPlatform != null){
        model.campaignPlatform = mapCampaignPlatformEntityToModel(entity.campaignPlatform);
    }
    return model;
}

export function mapCampaignIntModelToEntity(model: CampaignIntModel): CampaignIntCongEntity {
    const entity = new CampaignIntCongEntity();
    entity.id = model.id;
    entity.quantity = model.quantity;
    if(model.interactionType != null){
        entity.interactionType = mapInteractionTypeModelToEntity(model.interactionType);
    }
    
    if(model.campaignPlatform != null){
        entity.campaignPlatform = mapCampaignPlatformModelToEntity(model.campaignPlatform);
    }

    return entity;
}