import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from "typeorm";

export class CreateCampaignIntConglomerateTable1720829522159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'campaign_interaction_conglomerate',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'quantity',
                    type: 'float',
                },
                {
                    name: 'interaction_type_id',
                    type: 'int',
                },
                {
                    name: 'campaign_platform_id',
                    type: 'int',
                },
            ],
        }), true);

        await queryRunner.createUniqueConstraint('campaign_interaction_conglomerate', new TableUnique({
            columnNames: ['interaction_type_id', 'campaign_platform_id']
        }));

        await queryRunner.createForeignKey('campaign_interaction_conglomerate', new TableForeignKey({
            columnNames: ['interaction_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'interaction_type',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('campaign_interaction_conglomerate', new TableForeignKey({
            columnNames: ['campaign_platform_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'campaign_platform',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('campaign_interaction_conglomerate', true);
    }

}
