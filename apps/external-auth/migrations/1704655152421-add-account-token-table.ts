import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountTokenTable1704655152421 implements MigrationInterface {
    name = 'AddAccountTokenTable1704655152421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account_token" ("id" SERIAL NOT NULL, "account_id" character varying NOT NULL, "token_hash" text NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a55842d3341d42534e39f85e931" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "account_token"`);
    }

}
