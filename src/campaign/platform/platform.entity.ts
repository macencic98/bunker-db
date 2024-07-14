import { CampaignPlatform } from "../campaign-platform/campaignplatform.entity";
import { InteractionType } from "../interaction-type/itype.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "platform"})
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name" })
    name: string;

    @Column({ name: "tag" })
    tag: string;

    @Column({ name: "description", nullable: true })
    description: string;

    @OneToMany(() => InteractionType, interactionType => interactionType.platform,)
    interactionTypes: InteractionType[];

    @OneToMany(() => CampaignPlatform, campaignPlatform => campaignPlatform.platform,)
    campaignPlatforms: CampaignPlatform[];
}
