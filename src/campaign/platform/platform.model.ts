import { CampaignPlatform } from "../campaign-platform/campaignplatform.model";
import { InteractionType } from "../interaction-type/itype.model";

export class Platform {
    constructor() {
    }

    private _id: number;
    private _name: string;
    private _tag: string;
    private _description: string;
    private _interactionTypes: InteractionType[];

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

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get interactionTypes(): InteractionType[] {
        return this._interactionTypes;
    }

    set interactionTypes(value: InteractionType[]) {
        this._interactionTypes = value;
    }

    public addInteractionTypes(value: InteractionType) {
        this._interactionTypes.push(value);
    }
}