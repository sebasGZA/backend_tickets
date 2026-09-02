import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, RelationId } from "typeorm";
import { RoleTypeORMEntity } from "../../../role/infrastructure/persistence/role-typeorm.entity";

@Entity('users')
export class UserTypeORMEntity {
    @PrimaryColumn('uuid')
    id!: string;

    @Column({ type: 'text', unique: true })
    name!: string;

    @Column({ type: 'text', unique: true })
    email!: string;

    @Column('text')
    password!: string;

    @Column({ type: 'boolean', default: true })
    isActive!: boolean;

    @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP(6)', type: 'timestamp' })
    createdAt!: Date;

    @RelationId((user: UserTypeORMEntity) => user.role)
    roleId!: string;

    @ManyToOne(() => RoleTypeORMEntity, (role) => role.users)
    @JoinColumn()
    role!: RoleTypeORMEntity;
}