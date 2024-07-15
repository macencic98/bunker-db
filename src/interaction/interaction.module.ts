import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Interaction } from "./interaction.entity";
import { IInteractionService } from "./interactions.iservice";
import { InteractionService } from "./interaction.service";
import { IInteractionRepository } from "./interactions.irepository";
import { InteractionDynamoRepository } from "./interaction.nosqlrepo";
import { InteractionsController } from "./interactions.controller";
import { CampaignModule } from '../campaign/campaign.module';
import { ConfigService } from "@nestjs/config";
import * as dynamoose from 'dynamoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { IMessageListenerService, IMessageProducerService } from "./msgprod.interface";
import { EventService } from "./msg.service";

console.log(process.env.RABBITMQ_DEFAULT_QUEUE)
@Module({
  imports: [ClientsModule.register([
    {
      name: 'QUEUE_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://my_rabbitmq:5672'],
        queue: process.env.RABBITMQ_DEFAULT_QUEUE,
        socketOptions: {
          credentials: {
            username: process.env.RABBITMQ_DEFAULT_USER,
            password: process.env.RABBITMQ_DEFAULT_PASSWORD,
          },
        },
      },
    },
  ]), TypeOrmModule.forFeature([Interaction]), CampaignModule]
  ,
  controllers: [InteractionsController],
  providers: [Interaction,{
    provide: IInteractionService,
    useClass: InteractionService
  },
    {
      provide: IInteractionRepository,
      useClass: InteractionDynamoRepository
    }, {
      provide: IMessageListenerService,
      useClass: EventService,
    }, {
      provide: IMessageProducerService,
      useClass: EventService,
    },
    {
      provide: 'DYNAMOOSE',
      useFactory: (configService: ConfigService) => {
        const awsAccessKeyId = configService.get<string>('AWS_ACCESS_KEY_ID');
        const awsSecretAccessKey = configService.get<string>('AWS_SECRET_ACCESS_KEY');
        const awsRegion = configService.get<string>('AWS_REGION');
        const dynamoDBEndpoint = configService.get<string>('DYNAMODB_ENDPOINT');

        const ddb = new DynamoDB({
          credentials: {
            accessKeyId: awsAccessKeyId,
            secretAccessKey: awsSecretAccessKey,
          },
          region: awsRegion,
          endpoint: dynamoDBEndpoint,
        });

        dynamoose.aws.ddb.set(ddb);
        return dynamoose;
      },
      inject: [ConfigService],
    }],
  exports: [
    InteractionModule
  ],
})

export class InteractionModule { }
