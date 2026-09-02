import { Status } from "../../entities/status.entity";

export const STATUS_REPOSITORY = 'STATUS_REPOSITORY';

export interface StatusRepositoryPort {
    save(status: Status): Promise<void>;
    findAll(): Promise<Status[]>
    findById(id: string): Promise<Status | null>
}