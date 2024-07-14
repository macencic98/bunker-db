import { CampaignInteractionConglomerate } from "./campintcongl.model";

export interface ICampaignConglomerateRepository{
    create(cmpIntCongl: CampaignInteractionConglomerate): Promise<CampaignInteractionConglomerate>;
    incrementQuantity(cmpIntCongl: CampaignInteractionConglomerate): Promise<CampaignInteractionConglomerate>;
}

export const ICampaignConglomerateRepository = Symbol('ICampaignConglomerateRepository');