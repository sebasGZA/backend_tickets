import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('roles')
export class RoleTypeORMEntity {
    @PrimaryColumn('uuid')
    id!: string;

    @Column({ type: 'text', unique: true })
    name!: string;

    @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP(6)', type: 'timestamp' })
    createdAt!: Date
}