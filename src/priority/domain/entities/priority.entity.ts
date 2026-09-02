import { PriorityEnum } from "../enums/priority.enum";

export class Priority {
    constructor(readonly id: string, readonly name: PriorityEnum, readonly createdAt?: Date) { }

    static create(name: PriorityEnum, createdAt?: Date) {
        return new Priority(crypto.randomUUID(), name, createdAt)
    }

}