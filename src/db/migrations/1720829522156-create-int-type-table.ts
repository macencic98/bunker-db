import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableUnique } from "typeorm";

export class CreateIntTypeTable1720829522156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'interaction_type',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'platform_id',
                    type: 'int',
                },
            ],
        }), true);
        
        await queryRunner.createIndex('interaction_type', new TableIndex({
            name: 'IDX_UNIQUE_INTERACTION_TYPE',
            columnNames: ['name', 'platform_id'],
            isUnique: true,
        }));

        await queryRunner.createForeignKey('interaction_type', new TableForeignKey({
            columnNames: ['platform_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'platform',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('interaction_type', true);
    }

}
