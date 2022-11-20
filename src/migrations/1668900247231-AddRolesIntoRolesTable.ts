import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRolesIntoRolesTable1668900247231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO public.roles (id, "createdAt", name) VALUES (1, '2022-11-19 23:23:22.532681', 'ADMIN')`
        )
        await queryRunner.query(
            `INSERT INTO public.roles (id, "createdAt", name) VALUES (2, '2022-11-19 23:23:22.532681', 'USER')`
        )
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM public.roles WHERE id = 2)`
        )
        await queryRunner.query(
            `DELETE FROM public.roles WHERE id = 1)`
        )
        
    }

}
