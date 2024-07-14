import { Inject, Injectable } from "@nestjs/common";
import { IMessageService } from "./msgdisp.interface";
import { SQSMessageDispatcher } from "./msgdisp.sqsdispatcher";

@Injectable()
export class MessageService<T> implements IMessageService<T> {
  constructor(
    @Inject(SQSMessageDispatcher)
    private readonly sqsMessageDispatcher: SQSMessageDispatcher
  ) { 
  }

  public async sendEvent(data: T): Promise<T>{
    await this.send(JSON.stringify(data))

    return data;
  }

  private async send(message: string) {
    try {
      await this.sqsMessageDispatcher.sendMessage(message)
    } catch (error) {
      /* Lo correcto aca seria manejar el error de publicacion como un evento. */
      throw error
    }
  }
}