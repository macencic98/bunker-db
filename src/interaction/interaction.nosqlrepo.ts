import { Injectable, Logger } from "@nestjs/common";
import { Interaction as InteractionEntity } from "../interaction/interaction.entity";
import { IInteractionRepository } from "../interaction/interactions.irepository";
import { Interaction } from "./interaction.model";
import { RepositoryException } from "src/exceptions/errors.model";
@Injectable()
export class InteractionDynamoRepository implements IInteractionRepository {
    async create(interaction: Interaction): Promise<Interaction> {
        try {
            let interactionEntity = new InteractionEntity({
                campaign_tag: interaction.campaign.tag,
                id: interaction.id,
                interaction_type_tag: interaction.interactionType.name,
                platform_tag: interaction.interactionType.platform.name,
                user_info: interaction.userData,
            });

            await interactionEntity.save();
            return interaction;
        } catch (error) {
            Logger.log(error.message + error.stack, 'error')
            throw new RepositoryException("there has been an error storing the interaction")
        }

    }

}