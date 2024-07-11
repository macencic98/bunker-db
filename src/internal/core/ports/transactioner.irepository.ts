export interface IRepositoryTransactioner{
    do<T, B>(work: (manager: B) => Promise<T>)
}

export const IRepositoryTransactioner = Symbol('IRepositoryTransactioner');