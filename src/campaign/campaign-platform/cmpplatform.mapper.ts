import { CampaignPlatform as CampaignPlatformEntity } from './campaignplatform.entity';
import { mapCampaignEntityToModel, mapCampaignModelToEntity } from '../campaign.mapper';
import { mapPlatformEntityToModel, mapPlatformModelToEntity } from '../platform/platform.mapper';
import { CampaignPlatform } from './campaignplatform.model';
import { mapCampaignIntCongEntityToModel } from 'src/interaction/interactioncmp.mapper';
import { platform } from 'os';
import { map } from 'rxjs';
import { mapInteractionTypeModelToEntity } from '../interaction-type/itype.mapper';
import { MappingException } from 'src/exceptions/errors.model';
import { Logger } from '@nestjs/common';

export function mapCampaignPlatformEntityToModel(entity: CampaignPlatformEntity): CampaignPlatform {
    try {
        if (entity == undefined) {
            return null
        }

        const model = new CampaignPlatform(entity.platformBudget);
        model.id = entity.id;

        if (entity.platform != null) {
            model.platform = mapPlatformEntityToModel(entity.platform);
        }

        if (entity.campaign != null) {
            model.campaign = mapCampaignEntityToModel(entity.campaign);
        }

        if (entity.interactionConglomerates != null) {
            model.campInteractionConglomerates = new Array()
            entity.interactionConglomerates.forEach(element => {
                model.campInteractionConglomerates.push(mapCampaignIntCongEntityToModel(element))
            });
        }

        return model;
    } catch (error) {
        Logger.log(error.message + error.stack, 'error')
        throw new MappingException("there has been an error mapping campaign")
    }

}

export function mapCampaignPlatformModelToEntity(model: CampaignPlatform): CampaignPlatformEntity {
    try {
        const entity = new CampaignPlatformEntity();
        entity.id = model.id;
        entity.platformBudget = model.platformBudget;
        if (model.platform != null) {
            entity.platform = mapPlatformModelToEntity(model.platform);
        }

        if (model.campaign != null) {
            entity.campaign = mapCampaignModelToEntity(model.campaign);
        }

        return entity;
    } catch (error) {
        Logger.log(error.message + error.stack, 'error')
        throw new MappingException("there has been an error mapping campaign")
    }

}