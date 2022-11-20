import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInitialTables1668883784855 implements MigrationInterface {
    name = 'AddInitialTables1668883784855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "min" integer NOT NULL, "max" integer NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_fruits" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "min" integer NOT NULL, "max" integer NOT NULL, "user_id" integer, "fruits_id" integer, CONSTRAINT "PK_75fedc9bec838df8d2cf49daeab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fruits" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "Fruitsname" character varying NOT NULL, CONSTRAINT "UQ_637491d430ccc29692afab3be32" UNIQUE ("Fruitsname"), CONSTRAINT "PK_d859dae1c2610249e682e1ca46a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_fruits" ADD CONSTRAINT "FK_76a28d72bc8f2f21dbe9dc674a5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_fruits" ADD CONSTRAINT "FK_fd618c696f0636dc80812d7d6b2" FOREIGN KEY ("fruits_id") REFERENCES "fruits"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_fruits" DROP CONSTRAINT "FK_fd618c696f0636dc80812d7d6b2"`);
        await queryRunner.query(`ALTER TABLE "user_fruits" DROP CONSTRAINT "FK_76a28d72bc8f2f21dbe9dc674a5"`);
        await queryRunner.query(`DROP TABLE "fruits"`);
        await queryRunner.query(`DROP TABLE "user_fruits"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
