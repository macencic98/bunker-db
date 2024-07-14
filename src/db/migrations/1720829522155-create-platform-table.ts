import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePlatformTable1720829522155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'platform',
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
                    isUnique: true,
                },
                {
                    name: 'tag',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'description',
                    type: 'text',
                },
            ],
        }), true);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('platform', true);
    }

}
