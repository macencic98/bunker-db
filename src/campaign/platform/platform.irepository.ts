import { Platform } from "./platform.model";


export interface IPlatformRepository{
    findOneById(id: number): Promise<Platform>;
}

export const IPlatformRepository = Symbol('IPlatformRepository');