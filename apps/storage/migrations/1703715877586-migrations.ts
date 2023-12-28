import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1703715877586 implements MigrationInterface {
    name = 'Migrations1703715877586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL, "path" text NOT NULL, "status" character varying NOT NULL, "user_id" uuid NOT NULL, "content_type" text NOT NULL, "content_size" bigint NOT NULL, "bucket_id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
