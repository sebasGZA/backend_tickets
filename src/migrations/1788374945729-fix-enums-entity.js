/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class FixEnumsEntity1788374945729 {
    name = 'FixEnumsEntity1788374945729'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_name_enum" AS ENUM('Admin', 'Supervisor', 'Soporte')`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "name" "public"."roles_name_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "priorities" DROP CONSTRAINT "UQ_b2763a0af14ebc136bd91809ff9"`);
        await queryRunner.query(`ALTER TABLE "priorities" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."priorities_name_enum" AS ENUM('Baja', 'Media', 'Alta', 'Critica')`);
        await queryRunner.query(`ALTER TABLE "priorities" ADD "name" "public"."priorities_name_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "UQ_037e43ea842b18ce4e5f4dcfd06"`);
        await queryRunner.query(`ALTER TABLE "statuses" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."statuses_name_enum" AS ENUM('Abierto', 'En proceso', 'Cerrado', 'Reabierto')`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD "name" "public"."statuses_name_enum" NOT NULL`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "statuses" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."statuses_name_enum"`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "UQ_037e43ea842b18ce4e5f4dcfd06" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "priorities" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."priorities_name_enum"`);
        await queryRunner.query(`ALTER TABLE "priorities" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "priorities" ADD CONSTRAINT "UQ_b2763a0af14ebc136bd91809ff9" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")`);
    }
}
