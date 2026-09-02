export class Role {
    constructor(readonly id: string, readonly name: string, readonly createdAt?: Date) { }

    static create(name: string, createdAt?: Date) {
        return new Role(crypto.randomUUID(), name.toLowerCase(), createdAt)
    }

}