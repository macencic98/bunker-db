import { CampaignPlatform } from '../campaign-platform/campaignplatform.model';
import { CampaignInteractionConglomerate } from './campintcongl.model';

export interface ICampaignConglomerateService {
    create(campaignConglomerate: CampaignInteractionConglomerate): Promise<CampaignInteractionConglomerate>;
    createBulkConglomerates(campaignConglomerate: CampaignInteractionConglomerate[]): Promise<void>;
    buildConglomerates(campaignPlatform: CampaignPlatform): Promise<CampaignInteractionConglomerate[]>;
}

export const ICampaignConglomerateService = Symbol('ICampaignConglomerateService'); 