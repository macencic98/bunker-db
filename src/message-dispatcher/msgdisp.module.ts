import { Module } from "@nestjs/common";
import { IMessageService } from "./msgdisp.interface";
import { MessageService } from "./msgdisp.sqsservice";
import { SQSMessageDispatcher } from "./msgdisp.sqsdispatcher";

@Module({
    imports: [
      
    ],
  providers: [{
        useFactory: () => {
          return new SQSMessageDispatcher(process.env.aws_region, process.env.aws_access_key, process.env.secret_access, 
          process.env.sqs_url);
        },
        provide: SQSMessageDispatcher,
      }, {
      provide: IMessageService,
      useClass: MessageService
    },],
  exports: [
    MessageDispatcherModule, IMessageService
  ],
})

export class MessageDispatcherModule {}
