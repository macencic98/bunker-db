import { CampaignPlatform as CampaignPlatformEntity } from '../../../../core/domain/entities/campaign.entity';
import { CampaignPlatform as CampaignPlatformModel } from '../../../../core/domain/models/campaign.model';
import { mapCampaignEntityToModel, mapCampaignModelToEntity } from './campaign.mapper';
import { mapPlatformEntityToModel, mapPlatformModelToEntity } from './platform.mapper';

export function mapCampaignPlatformEntityToModel(entity: CampaignPlatformEntity): CampaignPlatformModel {
    const model = new CampaignPlatformModel(entity.platformBudget);
    model.id = entity.id;
    model.platform = mapPlatformEntityToModel(entity.platform);
    model.campaign = mapCampaignEntityToModel(entity.campaign);
    return model;
}

export function mapCampaignPlatformModelToEntity(model: CampaignPlatformModel): CampaignPlatformEntity {
    const entity = new CampaignPlatformEntity();
    entity.id = model.id;
    entity.platformBudget = model.platformBudget;
    entity.platform = mapPlatformModelToEntity(model.platform);
    entity.campaign = mapCampaignModelToEntity(model.campaign);
    return entity;
}