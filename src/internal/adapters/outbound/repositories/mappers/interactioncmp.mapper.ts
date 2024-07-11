import { CampaignInteractionConglomerate as CampaignInteractionCampaignInteractionConglomerateEntity } from '../../../../core/domain/entities/campaign.entity';
import { CampaignInteractionConglomerate as CampaignInteractionCampaignInteractionConglomerateModel } from '../../../../core/domain/models/campaign.model';
import { mapCampaignPlatformEntityToModel, mapCampaignPlatformModelToEntity } from './cmpplatform.mapper';
import { mapInteractionTypeEntityToModel, mapInteractionTypeModelToEntity } from './itype.mapper';

export function mapCampaignInteractionCampaignInteractionConglomerateEntityToModel(entity: CampaignInteractionCampaignInteractionConglomerateEntity): CampaignInteractionCampaignInteractionConglomerateModel {
    const model = new CampaignInteractionCampaignInteractionConglomerateModel(entity.quantity);
    model.id = entity.id;
    model.interactionType = mapInteractionTypeEntityToModel(entity.interactionType);
    model.campaignPlatform = mapCampaignPlatformEntityToModel(entity.campaignPlatform);
    return model;
}

export function mapCampaignInteractionCampaignInteractionConglomerateModelToEntity(model: CampaignInteractionCampaignInteractionConglomerateModel): CampaignInteractionCampaignInteractionConglomerateEntity {
    const entity = new CampaignInteractionCampaignInteractionConglomerateEntity();
    entity.id = model.id;
    entity.quantity = model.quantity;
    entity.interactionType = mapInteractionTypeModelToEntity(model.interactionType);
    entity.campaignPlatform = mapCampaignPlatformModelToEntity(model.campaignPlatform);
    return entity;
}