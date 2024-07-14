import { IGenericManager } from "./transactioner.imanager";

export interface IRepositoryTransactioner {
    do<T>(work: (manager: IGenericManager) => Promise<T>): Promise<T>;
}

export const IRepositoryTransactioner = Symbol('IRepositoryTransactioner');