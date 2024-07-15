import { CreateInteractionDTO } from "./interaction.dto";
import { Interaction } from "./interaction.model";
import { MsgListenerDTO } from "./msg.dto";

export interface IInteractionService{
    create(intDto: CreateInteractionDTO): Promise<Interaction>;
    handleInteractionEvent(dto: MsgListenerDTO<Interaction>): Promise<Interaction>;
}

export const IInteractionService = Symbol('IInteractionService');
