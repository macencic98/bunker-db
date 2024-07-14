export interface IMessageService<T>{
    sendEvent(data: T): Promise<T>
}

export const IMessageService = Symbol('IMessageService');