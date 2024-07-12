export interface IGenericManager {
    save<T>(entity: T): Promise<T>;
}

export const IGenericManager = Symbol('IGenericManager');

export interface IRepositoryTransactioner {
    do<T>(work: (manager: IGenericManager) => Promise<T>): Promise<T>;
}

  export const IRepositoryTransactioner = Symbol('IRepositoryTransactioner');