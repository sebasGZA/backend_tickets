/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class FixTicketEntity1788370497059 {
    name = 'FixTicketEntity1788370497059'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "updated_at" DROP DEFAULT`);
    }
}
