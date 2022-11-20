import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsers1668920402383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO public."user" (id, "createdAt", username, "firstName", "lastName", min, max, password, role_id) VALUES (1, '2022-11-20 00:31:09.862176', 'acerta1', 'acerta', 'acerta1', 21, 75, '$2a$10$8JFFyXIgQU1ab8.FfTaaD.IOcRFKeGQ5a0mMIy7/ixqUGEbuX94v.', 2)`
        )
        await queryRunner.query(
            `INSERT INTO public."user" (id, "createdAt", username, "firstName", "lastName", min, max, password, role_id) VALUES (2, '2022-11-20 00:31:09.862176', 'acerta2', 'acerta', 'acerta2', 45, 145, '$2a$10$8JFFyXIgQU1ab8.FfTaaD.IOcRFKeGQ5a0mMIy7/ixqUGEbuX94v.', 2)`
        )
        await queryRunner.query(
            `INSERT INTO public."user" (id, "createdAt", username, "firstName", "lastName", min, max, password, role_id) VALUES (3, '2022-11-20 00:31:09.862176', 'acertaAdmin', 'acerta', 'admin', 33, 63, '$2a$10$8JFFyXIgQU1ab8.FfTaaD.IOcRFKeGQ5a0mMIy7/ixqUGEbuX94v.', 1)`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM public."user" WHERE id = 1`
        )
        await queryRunner.query(
            `DELETE FROM public."user" WHERE id = 2`
        )
        await queryRunner.query(
            `DELETE FROM public."user" WHERE id = 3`
        )
    }

}
