import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('statuses')
export class StatusTypeORMEntity {
    @PrimaryColumn('uuid')
    id!: string;

    @Column({ type: 'text', unique: true })
    name!: string;

    @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP(6)', type: 'timestamp' })
    createdAt!: Date
}