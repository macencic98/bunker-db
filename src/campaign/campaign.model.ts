import { CampaignPlatform } from "./campaign-platform/campaignplatform.model";
import { Platform } from "./platform/platform.model";

export class Campaign {
    constructor() {
    }

    private _id: number;
    private _name: string;
    private _tag: string;
    private _totalBudget: number;
    private _startDate: Date;
    private _endDate: Date;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _deletedAt: Date;
    private _cmpPlatforms: CampaignPlatform[];

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

    get tag(): string {
        return this._tag;
    }

    set tag(value: string) {
        this._tag = value;
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

    get campaignPlatforms(): CampaignPlatform[] {
        return this._cmpPlatforms;
    }

    set campaignPlatforms(value: CampaignPlatform[]) {
        this._cmpPlatforms = value;
    }

    public addCampaignPlatform(value: CampaignPlatform) {
        this._cmpPlatforms.push(value);
    }
}



