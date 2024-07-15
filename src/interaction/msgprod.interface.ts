import { MsgListenerDTO, MsgProdDTO } from "./msg.dto";


export interface IMessageProducerService<T>{
    sendEvent(msg: MsgProdDTO<T>)
    
}

export const IMessageProducerService = Symbol('IMessageProducerService');

export interface IMessageListenerService<T>{
    handleMessage(message: MsgListenerDTO<T>): T
}

export const IMessageListenerService = Symbol('IMessageListenerService');