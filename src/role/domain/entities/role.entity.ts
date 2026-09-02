import { RoleEnum } from "../enums/role.enum";

export class Role {
    constructor(readonly id: string, readonly name: RoleEnum, readonly createdAt?: Date) { }

    static create(name: RoleEnum, createdAt?: Date) {
        return new Role(crypto.randomUUID(), name, createdAt)
    }

}