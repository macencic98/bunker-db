import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Campaign } from "../campaign.entity";
import { Platform } from "../platform/platform.entity";
import { CampaignInteractionConglomerate } from "../campaign-conglomerate/campconglom.entity";

@Entity({name: "campaign_platform"})
@Index("IDX_UNIQUE_CMP_PLATFORM", ["platform.id", "campaign.id"], { unique: true })
export class CampaignPlatform {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Platform, platform => platform.campaignPlatforms)
    @JoinColumn({name: 'platform_id'})
    platform: Platform;

    @ManyToOne(() => Campaign, campaign => campaign.platforms)
    @JoinColumn({name: 'campaign_id'})
    campaign: Campaign;

    @OneToMany(() => CampaignInteractionConglomerate, cmcmpIntConglomerate => cmcmpIntConglomerate.campaignPlatform, )
    interactionConglomerates: CampaignInteractionConglomerate[];

    @Column({ name: "platform_budget" })
    platformBudget: number;
}