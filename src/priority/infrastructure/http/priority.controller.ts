import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { PriorityService } from "../../application/services/priority.service";

@ApiTags('Priorities')
@Controller('priorities')
export class PriorityController {
    constructor(private readonly priorityService: PriorityService) { }

    @Get()
    getPriorities() {
        return this.priorityService.getAll()
    }
}