import { InteractionType } from "../../../domain/models/itype.model";


export interface IInteractionTypeRepository{
    create(iType: InteractionType): Promise<InteractionType>;
    findOneById(id: number): Promise<InteractionType>;
    findByPlatform(id: number): Promise<InteractionType[]>;
}

export const IInteractionTypeRepository = Symbol('IInteractionTypeRepository');