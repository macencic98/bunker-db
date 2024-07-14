import { CreateInteractionDTO } from "./interaction.dto";
import { Interaction } from "./interaction.model";

export interface IInteractionService{
    create(campaignPlatform: CreateInteractionDTO): Promise<Interaction>;
}

export const IInteractionService = Symbol('IInteractionService');
