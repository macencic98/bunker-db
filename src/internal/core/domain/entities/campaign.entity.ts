import { Unique, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { InteractionType } from './itype.entity';
import { Platform } from './platform.entity';

@Entity()
@Unique('name_constraint', ['name']) 
export class Campaign {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name:"name"})
    name: string

    @Column({name:"total_budget"})
    totalBudget: number
    
    @Column({name:"start_date"})
    startDate: Date

    @Column({name:"end_date"})
    endDate: Date

    @Column({name:"created_at"})
    createdAt: Date

    @Column({name:"updated_at"})
    updatedAt: Date

    @Column({name:"deleted_at"})
    deletedAt: Date

    @OneToMany(() => CampaignPlatform, (cmpPlatform) => cmpPlatform.campaign, {})
    platforms: CampaignPlatform[]
}


@Entity()
@Index("campaign_cmplatform_constraint", ["platform.id", "campaign.id"], { unique: true })
export class CampaignPlatform {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Platform, platform => platform.campaignPlatforms)
    @JoinColumn({name: 'platform_id'})
    platform: Platform;

    @ManyToOne(() => Campaign, campaign => campaign.platforms)
    @JoinColumn({name: 'campaign_id'})
    campaign: Campaign;

    @Column({ name: "platform_budget" })
    platformBudget: number;
}

@Entity()
@Index("interactiont_campaignplt_constraint", ["interactionType.id", "campaignPlatform.id"], { unique: true })
export class CampaignInteractionConglomerate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "quantity" })
    quantity: number;

    @ManyToOne(() => InteractionType, interactionType => interactionType.id)
    @JoinColumn({name: 'interaction_type_id'})
    interactionType: InteractionType;

    @ManyToOne(() => CampaignPlatform, campaignPlatform => campaignPlatform.id)
    @JoinColumn({name: 'campaign_platform_id'})
    campaignPlatform: CampaignPlatform;
}