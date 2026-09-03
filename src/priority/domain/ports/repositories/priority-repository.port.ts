import { Priority } from '../../entities/priority.entity';
import { PriorityEnum } from '../../enums/priority.enum';

export const PRIORITY_REPOSITORY = 'PRIORITY_REPOSITORY';

export interface PriorityRepositoryPort {
  save(priority: Priority): Promise<void>;
  findAll(): Promise<Priority[]>;
  findById(id: string): Promise<Priority | null>;
  findByName(name: PriorityEnum): Promise<Priority | null>;
}
