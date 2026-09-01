import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('clients')
export class ClientTypeORMEntity {
    @PrimaryColumn('uuid')
    id!: string;

    @Column('text')
    name!: string;

    @Column({
        type: 'text',
        unique: true,
    })
    email!: string;

    @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP(6)', type: 'timestamp' })
    createdAt!: Date;
}