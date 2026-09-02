import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { RoleService } from "../../application/services/role.service";

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get()
    getRoles() {
        return this.roleService.getAll()
    }
}