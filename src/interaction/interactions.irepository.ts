import { Interaction } from "./interaction.model";

export interface IInteractionRepository{
    create(interaction: Interaction): Promise<Interaction>;
}

export const IInteractionRepository = Symbol('IInteractionRepository');