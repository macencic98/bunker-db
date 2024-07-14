import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPlatformTable1720829522157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO platform (name, tag, description)
            VALUES
                ('Facebook', 'FB', 'Facebook social media'),
                ('Facebook ads', 'FB_ADS', 'Facebook marketing service'),
                ('Google ADS', 'GL_ADS', 'Google marketing service')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM platform
            WHERE tag IN ('FB', 'FB_ADS', 'GL_ADS')
        `);
    }

}