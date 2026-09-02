/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddTicketsEntity1788329040896 {
    name = 'AddTicketsEntity1788329040896'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP, "closed_at" TIMESTAMP, "resolved_at" TIMESTAMP, "statusId" uuid, "priorityId" uuid, "clientId" uuid, "createdById" uuid, "assignedToId" uuid, "updatedById" uuid, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_022764a653d4a0490793a4e5a20" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_d0a88eba61ef09cff4ac7217b2a" FOREIGN KEY ("priorityId") REFERENCES "priorities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_18d92e4ad96cc89472968daf1e3" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_41de538b3eed286f53dd678b030" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_7712f291901ceeb504b329df623" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_4b7f2c664f13e276482b926899d" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_4b7f2c664f13e276482b926899d"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_7712f291901ceeb504b329df623"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_41de538b3eed286f53dd678b030"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_18d92e4ad96cc89472968daf1e3"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_d0a88eba61ef09cff4ac7217b2a"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_022764a653d4a0490793a4e5a20"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
    }
}
