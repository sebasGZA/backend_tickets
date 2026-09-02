import { StatusEnum } from "../enums/status.enum";

export class Status {
    constructor(readonly id: string, readonly name: StatusEnum, readonly createdAt?: Date) { }

    static create(name: StatusEnum, createdAt?: Date) {
        return new Status(crypto.randomUUID(), name, createdAt)
    }

}