import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MsgProdDTO } from './msg.dto';

@Injectable()
export class EventService<T> {
    constructor(@Inject('QUEUE_SERVICE') private rabbitClient: ClientProxy) { }

    async sendEvent(int: MsgProdDTO<T>) {
        try {
            Logger.log(JSON.stringify(await this.rabbitClient.send({ cmd: 'event' }, int)));

            return { message: 'event Placed!' };
        } catch (error) {
            Logger.log("there has been an error sending the event" + JSON.stringify(error))
            throw new Error("error sending message to the message service")
        }

    }

    handleMessage(message: MsgProdDTO<T>): T {
        return message.data
    }
}