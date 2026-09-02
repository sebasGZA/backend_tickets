import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserTypeORMEntity } from "../../../user/infrastructure/persistence/user-typeorm.entity";
import { RoleEnum } from "../../domain/enums/role.enum";

@Entity('roles')
export class RoleTypeORMEntity {
    @PrimaryColumn('uuid')
    id!: string;

    @Column({ type: 'enum', enum: RoleEnum })
    name!: RoleEnum;

    @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP(6)', type: 'timestamp' })
    createdAt!: Date;

    @OneToMany(() => UserTypeORMEntity, (users) => users.role)
    users!: UserTypeORMEntity[];
}