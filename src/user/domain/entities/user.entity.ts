import { Role } from "src/role/domain/entities/role.entity";

export class User {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly password: string,
        readonly roleId: string,
        readonly role: Role,
        readonly isActive?: boolean,
        readonly createdAt?: Date,
    ) { }

    static create(
        name: string,
        email: string,
        password: string,
        roleId: string,
        role: Role,
        isActive?: boolean,
        createdAt?: Date,
    ) {
        return new User(
            crypto.randomUUID(),
            name.toLowerCase(),
            email,
            password,
            roleId,
            role,
            isActive,
            createdAt,
        )
    }
}