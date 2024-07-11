import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"
import { InteractionType } from "./itype.entity";
import { CampaignPlatform } from "./campaign.entity";

@Entity()
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name" })
    name: string;

    @Column({ name: "tag" })
    tag: string;

    @Column({ name: "description", nullable: true })
    description: string;

    @OneToMany(() => InteractionType, interactionType => interactionType.platform)
    interactionTypes: InteractionType[];

    @OneToMany(() => CampaignPlatform, campaignPlatform => campaignPlatform.platform)
    campaignPlatforms: CampaignPlatform[];
}
