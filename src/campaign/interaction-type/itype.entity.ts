import { Platform } from '../platform/platform.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
@Entity({name: "interaction_type"})
export class InteractionType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name" })
    name: string;

    @Column({ name: "description", nullable: true })
    description: string;

    @ManyToOne(() => Platform, platform => platform.interactionTypes,)
    @JoinColumn({name: 'platform_id'})
    platform: Platform;
}