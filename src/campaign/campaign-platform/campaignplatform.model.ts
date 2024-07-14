import { CampaignInteractionConglomerate } from "src/campaign/campaign-conglomerate/campintcongl.model";
import { Campaign } from "../campaign.model";
import { Platform } from "../platform/platform.model";

export class CampaignPlatform {
    constructor(platformBudget: number) {
        this._platformBudget = platformBudget;
        this._campInteractionCongl = new Array()
    }

    private _id: number;
    private _platformBudget: number;
    private _campaign: Campaign;
    private _platform: Platform;
    private _campInteractionCongl: CampaignInteractionConglomerate[];
    
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get platform(): Platform {
        return this._platform;
    }

    set platform(value: Platform) {
        this._platform = value;
    }

    get campaign(): Campaign {
        return this._campaign;
    }

    set campaign(value: Campaign) {
        this._campaign = value;
    }

    get platformBudget(): number {
        return this._platformBudget;
    }

    set platformBudget(value: number) {
        this._platformBudget = value;
    }   

    get campInteractionConglomerates(): CampaignInteractionConglomerate[] {
        return this._campInteractionCongl;
    }

    set campInteractionConglomerates(congl: CampaignInteractionConglomerate[]) {
        this._campInteractionCongl = congl;

    }
    public setCampInteractionConglomerates(congl: CampaignInteractionConglomerate[]) {
        this._campInteractionCongl = congl;
    }  

    public addInteractionConglomerate(value: CampaignInteractionConglomerate) {
        this._campInteractionCongl.push(value);
    }
}
