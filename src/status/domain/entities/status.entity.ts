export class Status {
    constructor(readonly id: string, readonly name: string, readonly createdAt?: Date) { }

    static create(name: string, createdAt?: Date) {
        return new Status(crypto.randomUUID(), name.toLowerCase(), createdAt)
    }

}