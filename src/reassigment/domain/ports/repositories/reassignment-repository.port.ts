import { CreateReassignment } from '../../dtos/create-reassignment.interface';

export const REASSIGNMENT_REPOSITORY = 'REASSIGNMENT_REPOSITORY';

export interface ReassignmentRepositoryPort {
  save(createDto: CreateReassignment): Promise<void>;
}
