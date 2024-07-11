import { Platform } from "./platform.model";

export class InteractionType {
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    private _id: number;
    private _name: string;
    private _description: string;
    private _platform: Platform;

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

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get platform(): Platform {
        return this._platform;
    }

    set platform(value: Platform) {
        this._platform = value;
    }
}