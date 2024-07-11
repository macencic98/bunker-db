
import { InteractionType } from "./itype.model";
import { Platform } from "./platform.model";
export class Campaign {
    constructor(budget: number, name: string, startDate: Date, endDate?: Date) {
        this.totalBudget = budget;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    private _id: number;
    private _name: string;
    private _totalBudget: number;
    private _startDate: Date;
    private _endDate: Date;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _deletedAt: Date;
    private _platforms: Platform[];

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get totalBudget(): number {
        return this._totalBudget;
    }

    set totalBudget(value: number) {
        this._totalBudget = value;
    }

    get startDate(): Date {
        return this._startDate;
    }

    set startDate(value: Date) {
        this._startDate = value;
    }

    get endDate(): Date {
        return this._endDate;
    }

    set endDate(value: Date) {
        this._endDate = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }

    get deletedAt(): Date {
        return this._deletedAt;
    }

    set deletedAt(value: Date) {
        this._deletedAt = value;
    }

    get platforms(): Platform[] {
        return this._platforms;
    }

    set platforms(value: Platform[]) {
        this._platforms = value;
    }

    public addPlatform(value: Platform) {
        this._platforms.push(value);
    }
}


export class CampaignInteractionConglomerate {
    constructor(quantity: number) {
        this.quantity = quantity;
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


export class CampaignPlatform {
    constructor(platformBudget: number) {
        this.platformBudget = platformBudget;
    }

    private _id: number;
    private _platformBudget: number;
    private _campaign: Campaign;
    private _platform: Platform;
    private _campInteractionCongl: CampaignInteractionConglomerate;
    
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

    get campInteractionConglomerate(): CampaignInteractionConglomerate {
        return this._campInteractionCongl;
    }

    set campInteractionConglomerate(value: CampaignInteractionConglomerate) {
        this._campInteractionCongl = value;
    }
}
