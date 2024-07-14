import { InteractionType } from "../campaign/interaction-type/itype.model";
import { UserData } from "../campaign/userdata.model";
import { Campaign } from "../campaign/campaign.model";

export class Interaction {
    private _id: string;
    private _interactionType: InteractionType
    private _campaign: Campaign 
    private _userData: UserData

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get interactionType(): InteractionType {
        return this._interactionType;
    }

    set interactionType(value: InteractionType) {
        this._interactionType = value;
    }

    get campaign(): Campaign {
        return this._campaign;
    }

    set campaign(value: Campaign) {
        this._campaign = value;
    }

    get userData(): UserData {
        return this._userData;
    }

    set userData(value: UserData) {
        this._userData = value;
    }
}