import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFruits1668884077677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO public.fruits (id, "createdAt", "Fruitsname") VALUES (1, '2022-11-19 18:55:05.530225', 'Apple')`
        )
        await queryRunner.query(
            `INSERT INTO public.fruits (id, "createdAt", "Fruitsname") VALUES (2, '2022-11-19 18:55:05.530225', 'Mango')`
        )
        await queryRunner.query(
            `INSERT INTO public.fruits (id, "createdAt", "Fruitsname") VALUES (3, '2022-11-19 18:55:05.530225', 'Banana')`
        )
        await queryRunner.query(
            `INSERT INTO public.fruits (id, "createdAt", "Fruitsname") VALUES (4, '2022-11-19 18:55:05.530225', 'Grapes')`
        )
        await queryRunner.query(
            `INSERT INTO public.fruits (id, "createdAt", "Fruitsname") VALUES (5, '2022-11-19 18:55:05.530225', 'Green Grapes')`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM public.fruits WHERE id = 1`
        )
        await queryRunner.query(
            `DELETE FROM public.fruits WHERE id = 2`
        )
        await queryRunner.query(
            `DELETE FROM public.fruits WHERE id = 3`
        )
        await queryRunner.query(
            `DELETE FROM public.fruits WHERE id = 4`
        )
        await queryRunner.query(
            `DELETE FROM public.fruits WHERE id = 5`
        )
    }

}
