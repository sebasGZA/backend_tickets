export class Client {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly createdAt?: Date,
    ) { }

    static create(name: string, email: string, createdAt?: Date) {
        return new Client(crypto.randomUUID(), name, email, createdAt)
    }
}