import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountTable1704569354132 implements MigrationInterface {
    name = 'AddAccountTable1704569354132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "user_id" uuid NOT NULL, "provider" character varying NOT NULL, "status" character varying NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
