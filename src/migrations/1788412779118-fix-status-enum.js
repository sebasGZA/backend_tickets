/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class FixStatusEnum1788412779118 {
    name = 'FixStatusEnum1788412779118'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "public"."statuses_name_enum" RENAME TO "statuses_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."statuses_name_enum" AS ENUM('Abierto', 'En_proceso', 'Cerrado', 'Reabierto')`);
        await queryRunner.query(`ALTER TABLE "statuses" ALTER COLUMN "name" TYPE "public"."statuses_name_enum" USING "name"::"text"::"public"."statuses_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."statuses_name_enum_old"`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."statuses_name_enum_old" AS ENUM('Abierto', 'En proceso', 'Cerrado', 'Reabierto')`);
        await queryRunner.query(`ALTER TABLE "statuses" ALTER COLUMN "name" TYPE "public"."statuses_name_enum_old" USING "name"::"text"::"public"."statuses_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."statuses_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."statuses_name_enum_old" RENAME TO "statuses_name_enum"`);
    }
}
