import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { StatusService } from "../../application/services/status.service";

@ApiTags('Statuses')
@Controller('statuses')
export class StatusController {
    constructor(private readonly statusService: StatusService) { }

    @Get()
    getStatuses() {
        return this.statusService.getAll()
    }
}