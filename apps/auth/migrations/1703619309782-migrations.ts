import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1703619309782 implements MigrationInterface {
    name = 'Migrations1703619309782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth_code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" smallint NOT NULL, "user_id" uuid NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_79343e6f9a8993c26d9047b480b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auth_code"`);
    }

}
