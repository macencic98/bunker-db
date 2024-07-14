import { Logger } from '@nestjs/common';
import { mapCampaignPlatformEntityToModel } from './campaign-platform/cmpplatform.mapper';
import { Campaign as CampaignEntity } from './campaign.entity';
import { Campaign } from './campaign.model';
import { MappingException } from 'src/exceptions/errors.model';

export function mapCampaignEntityToModel(entity: CampaignEntity): Campaign {
    try {
        const model = new Campaign();
        model.totalBudget = entity.totalBudget
        model.name = entity.name
        model.startDate = entity.startDate
        model.endDate = entity.endDate
        model.id = entity.id;
        model.createdAt = entity.createdAt;
        model.updatedAt = entity.updatedAt;
        model.deletedAt = entity.deletedAt;
        if (entity.platforms != null) {
            console.log("1")
            model.campaignPlatforms = new Array()
            console.log(entity.platforms.length)
            entity.platforms.forEach(element => {
                model.campaignPlatforms.push(mapCampaignPlatformEntityToModel(element))
            });
        }
        return model;
    } catch (error) {
        Logger.log(error.message + error.stack, 'error')
        throw new MappingException("there has been an error mapping campaign")
    }
}

export function mapCampaignModelToEntity(model: Campaign): CampaignEntity {
    const entity = new CampaignEntity();
    entity.id = model.id;
    entity.name = model.name;
    entity.tag = model.tag;
    entity.totalBudget = model.totalBudget;
    entity.startDate = model.startDate;
    entity.endDate = model.endDate;
    entity.createdAt = model.createdAt;
    entity.updatedAt = model.updatedAt;

    return entity;
}