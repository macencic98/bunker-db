export interface IGenericManager{
    save<T>(entity: T): Promise<T>;
}

export const IGenericManager = Symbol('IGenericManager')