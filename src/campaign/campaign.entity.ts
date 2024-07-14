import { Unique, Column, Entity, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { CampaignPlatform } from './campaign-platform/campaignplatform.entity';

@Entity({name: "campaign"})
@Unique('name_constraint', ['name']) 
export class Campaign {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name:"name"})
    name: string

    @Column({name:"tag"})
    tag: string

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

    @Column({ type: 'timestamp', nullable: true, name: "deleted_at"})
    deletedAt: Date

    @OneToMany(() => CampaignPlatform, (cmpPlatform) => cmpPlatform.campaign,)
    platforms: CampaignPlatform[]
}
