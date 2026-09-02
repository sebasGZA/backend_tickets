/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddReassignmentsEntity1788338117434 {
    name = 'AddReassignmentsEntity1788338117434'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "reassignments" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ticketId" uuid, "createdById" uuid, "lastUserById" uuid, "newUserById" uuid, CONSTRAINT "PK_b42690dfdf85c9b2ba78ffd8ae6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reassignments" ADD CONSTRAINT "FK_7d0e888a64608b9a592ae0e99f4" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reassignments" ADD CONSTRAINT "FK_9842a882e55257ea96df1a7f23f" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reassignments" ADD CONSTRAINT "FK_61a1b89954cc1fe0b6ed30872d4" FOREIGN KEY ("lastUserById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reassignments" ADD CONSTRAINT "FK_8f43998b451f88bc0833b8e663f" FOREIGN KEY ("newUserById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "reassignments" DROP CONSTRAINT "FK_8f43998b451f88bc0833b8e663f"`);
        await queryRunner.query(`ALTER TABLE "reassignments" DROP CONSTRAINT "FK_61a1b89954cc1fe0b6ed30872d4"`);
        await queryRunner.query(`ALTER TABLE "reassignments" DROP CONSTRAINT "FK_9842a882e55257ea96df1a7f23f"`);
        await queryRunner.query(`ALTER TABLE "reassignments" DROP CONSTRAINT "FK_7d0e888a64608b9a592ae0e99f4"`);
        await queryRunner.query(`DROP TABLE "reassignments"`);
    }
}
