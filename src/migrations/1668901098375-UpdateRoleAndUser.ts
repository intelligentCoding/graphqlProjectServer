import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRoleAndUser1668901098375 implements MigrationInterface {
    name = 'UpdateRoleAndUser1668901098375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role_id"`);
    }

}
