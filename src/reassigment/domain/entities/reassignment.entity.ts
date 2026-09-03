import { CreateReassignment } from '../dtos/create-reassignment.interface';

export class Reassignment {
  constructor(
    readonly id: string,
    readonly ticketId: string,
    readonly lastUserId: string,
    readonly newUserId: string,
    readonly createdById: string,
    readonly createdAt?: Date,
  ) {}

  static create({
    ticketId,
    lastUserId,
    newUserId,
    createdById,
    createdAt,
  }: CreateReassignment) {
    return new Reassignment(
      crypto.randomUUID(),
      ticketId,
      lastUserId,
      newUserId,
      createdById,
      createdAt,
    );
  }
}
