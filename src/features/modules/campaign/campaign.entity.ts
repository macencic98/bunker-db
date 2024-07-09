import { Entity, PrimaryColumn, Column } from "@nestjs/typeorm"

@Entity()
export class Campaign {
    @PrimaryColumn()
    id: number

    @Column("name")
    name: string

    @Column("total_budget")
    totalBudget: number

    @Column("type_id")
    typeId: string

    @Column("start_date")
    startDate: Date

    @Column("end_date")
    endDate: Date

    @Column("created_at")
    createdAt: Date

    @Column("updated_at")
    updated_at: Date

    @Column("deleted_at")
    deleted_at: Date
}