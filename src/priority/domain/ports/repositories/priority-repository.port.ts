import { Priority } from "../../entities/priority.entity";

export const PRIORITY_REPOSITORY = 'PRIORITY_REPOSITORY';

export interface PriorityRepositoryPort {
    save(priority: Priority): Promise<void>;
    findAll(): Promise<Priority[]>
}