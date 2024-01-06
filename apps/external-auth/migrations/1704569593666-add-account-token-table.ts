import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountTokenTable1704569593666 implements MigrationInterface {
    name = 'AddAccountTokenTable1704569593666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account_token" ("id" SERIAL NOT NULL, "account_id" character varying NOT NULL, "token_hash" text NOT NULL, "name" character varying NOT NULL, "account_id_id" character varying, CONSTRAINT "PK_a55842d3341d42534e39f85e931" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account_token" ADD CONSTRAINT "FK_4e9e425d73b5298f3dc961a6655" FOREIGN KEY ("account_id_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_token" DROP CONSTRAINT "FK_4e9e425d73b5298f3dc961a6655"`);
        await queryRunner.query(`DROP TABLE "account_token"`);
    }

}
