export class Priority {
    constructor(readonly id: string, readonly name: string, readonly createdAt?: Date) { }

    static create(name: string, createdAt?: Date) {
        return new Priority(crypto.randomUUID(), name.toLowerCase(), createdAt)
    }

}