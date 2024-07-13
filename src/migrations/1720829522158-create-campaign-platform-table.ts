import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from "typeorm";

export class CreateCampaignPlatformTable1720829522158 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'campaign_platform',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'platform_budget',
                    type: 'float',
                },
                {
                    name: 'platform_id',
                    type: 'int',
                },
                {
                    name: 'campaign_id',
                    type: 'int',
                },
            ],
        }), true);

        await queryRunner.createUniqueConstraint('campaign_platform', new TableUnique({
            columnNames: ['platform_id', 'campaign_id']
        }));

        await queryRunner.createForeignKey('campaign_platform', new TableForeignKey({
            columnNames: ['platform_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'platform',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('campaign_platform', new TableForeignKey({
            columnNames: ['campaign_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'campaign',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('campaign_platform', true);
    }

}
