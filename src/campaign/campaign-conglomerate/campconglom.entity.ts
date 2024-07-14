import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InteractionType } from "../interaction-type/itype.entity";
import { CampaignPlatform } from "../campaign-platform/campaignplatform.entity";

@Entity({name: "campaign_interaction_conglomerate"})
@Index("IDX_UINIQUE_CMP_INT_CONG", ["interactionType.id", "campaignPlatform.id"], { unique: true })
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