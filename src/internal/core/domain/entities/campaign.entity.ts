import { Unique, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
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

    @ManyToOne(() => CampaignPlatform, (cmpPlatform) => cmpPlatform.campaign, {})
    platforms: CampaignPlatform[]
}

@Unique('platform_campaign_constraint', ['platform, campaign']) 
@Entity()
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

@Unique('interactiont_campaignplt_constraint', ['interactionType, campaignPlatform']) 
@Entity()
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