import { CampaignPlatform } from "../campaign-platform/campaignplatform.model";
import { InteractionType } from "../interaction-type/itype.model";

export class CampaignInteractionConglomerate {
    constructor(quantity: number) {
        this._quantity = quantity;
    }

    private _id: number;
    private _quantity: number;
    private _interactionType: InteractionType;
    private _campaignPlatform: CampaignPlatform;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        this._quantity = value;
    }

    get interactionType(): InteractionType {
        return this._interactionType;
    }

    set interactionType(value: InteractionType) {
        this._interactionType = value;
    }

    get campaignPlatform(): CampaignPlatform {
        return this._campaignPlatform;
    }

    set campaignPlatform(value: CampaignPlatform) {
        this._campaignPlatform = value;
    }
}