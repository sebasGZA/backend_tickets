import { Reassignment } from '../../entities/reassignment.entity';

export const REASSIGNMENT_REPOSITORY = 'REASSIGNMENT_REPOSITORY';

export interface ReassignmentRepositoryPort {
  save(createDto: Reassignment): Promise<void>;
}
