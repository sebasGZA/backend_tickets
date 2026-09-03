import { CreateReassignment } from '../dtos/create-reassignment.interface';

export class Reassignment {
  constructor(
    readonly id: string,
    readonly ticketId: string,
    readonly newUserId: string,
    readonly createdById: string,
    readonly lastUserId?: string,
    readonly createdAt?: Date,
  ) {}

  static create({
    ticketId,
    newUserId,
    createdById,
    lastUserId,
    createdAt,
  }: CreateReassignment) {
    return new Reassignment(
      crypto.randomUUID(),
      ticketId,
      newUserId,
      createdById,
      lastUserId,
      createdAt,
    );
  }
}
