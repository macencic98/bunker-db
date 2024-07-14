import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInteractionTypeTable1720829522158 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO interaction_type (name, description, platform_id)
            VALUES
                ('LIKE', 'Post liked', (SELECT id FROM platform WHERE tag = 'FB')),
                ('VIEW', 'Ad seen', (SELECT id FROM platform WHERE tag = 'FB_ADS')),
                ('VIEW', 'Ad seen', (SELECT id FROM platform WHERE tag = 'GL_ADS')),
                ('IMPRESSION', 'Ad seen for first time', (SELECT id FROM platform WHERE tag = 'GL_ADS'));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM interaction_type
            WHERE name IN ('IMPRESSION', 'LIKE', 'VIEW') AND
            platform_id IN (SELECT id FROM platform WHERE tag IN ('FB', 'FB_ADS', 'GL_ADS');
        `);
    }

}