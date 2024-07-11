import { Campaign as CampaignEntity } from '../../../../core/domain/entities/campaign.entity';
import { Campaign as CampaignModel } from '../../../../core/domain/models/campaign.model';

export function mapCampaignEntityToModel(entity: CampaignEntity): CampaignModel {
    const model = new CampaignModel(entity.totalBudget, entity.name, entity.startDate, entity.endDate);
    model.id = entity.id;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;
    model.deletedAt = entity.deletedAt;
    //model._platforms(entity._platforms.map(mapCampaignPlatformEntityToModel))
    return model;
}

export function mapCampaignModelToEntity(model: CampaignModel): CampaignEntity {
    const entity = new CampaignEntity();
    entity.id = model.id;
    entity.name = model.name;
    entity.totalBudget = model.totalBudget;
    entity.startDate = model.startDate;
    entity.endDate = model.endDate;
    entity.createdAt = model.createdAt;
    entity.updatedAt = model.updatedAt;
    entity.deletedAt = model.deletedAt;

    return entity;
}