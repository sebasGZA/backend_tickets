import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ReassignmentService } from './../../application/services/reassignment.service';
import { CreateReassignmentDto } from '../dtos/create-reassignment.dto';

@ApiTags('Reassignments')
@Controller('reassignments')
export class ReassignmentController {
    constructor(private readonly reassignmentService: ReassignmentService) { }

    @Post()
    postReassignment(@Body() createDto: CreateReassignmentDto) {
        return this.reassignmentService.create(createDto)
    }
}