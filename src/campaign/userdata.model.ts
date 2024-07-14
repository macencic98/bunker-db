export class UserData {
    constructor(id: string) {
        this._id = id;
    }

    private _id: string;
    private _metadata: { [key: string]: any }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get metadata(): { [key: string]: any } {
        return this._metadata;
    }

    set metadata(value: { [key: string]: any } ) {
        this._metadata = value;
    }
}