import { Injectable, Logger } from '@nestjs/common';
import { SQS } from 'aws-sdk';

@Injectable()
export class SQSMessageDispatcher {
  private sqs: SQS;
  private sqsQueueUrl: string;

  constructor(region: string, accessKey: string, secretAcces: string, url: string) {
    this.sqs = new SQS({
      region: region,
      accessKeyId: accessKey,
      secretAccessKey: secretAcces,
    });
    this.sqsQueueUrl = url;
  }

  async sendMessage(messageBody: string, msgGroupId?: string): Promise<SQS.SendMessageResult> {
    try {
      const sqsMessage: SQS.SendMessageRequest = {
        QueueUrl: this.sqsQueueUrl,
        MessageBody: messageBody,

        MessageGroupId: msgGroupId,
      };

      new SQS.Types().makeRequest
      const result = await this.sqs.sendMessage(sqsMessage).promise();
      return result;
    } catch (err) {
      Logger.log(err.message + err.stack, 'error')
      throw new Error("error sending message to SQS queue");
    }
  }
}