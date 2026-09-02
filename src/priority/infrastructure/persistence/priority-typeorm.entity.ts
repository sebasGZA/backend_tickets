import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('priorities')
export class PriorityTypeORMEntity {
    @PrimaryColumn('uuid')
    id!: string;

    @Column({ type: 'text', unique: true })
    name!: string;

    @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP(6)', type: 'timestamp' })
    createdAt!: Date
}