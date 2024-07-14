import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Interaction } from "./interaction.entity";
import { IInteractionService } from "./interactions.iservice";
import { InteractionService } from "./interaction.service";
import { IInteractionRepository } from "./interactions.irepository";
import { InteractionDynamoRepository } from "./interaction.nosqlrepo";
import { InteractionsController } from "./interactions.controller";
import { CampaignModule } from '../campaign/campaign.module';
import { MessageDispatcherModule } from "../message-dispatcher/msgdisp.module";

@Module({
  imports: [TypeOrmModule.forFeature([Interaction]), CampaignModule, MessageDispatcherModule],
  controllers: [InteractionsController],
  providers: [Interaction, {
    provide: IInteractionService,
    useClass: InteractionService
  },
  {
    provide: IInteractionRepository,
    useClass: InteractionDynamoRepository
  },],
  exports: [
    InteractionModule
  ],
})

export class InteractionModule { }

