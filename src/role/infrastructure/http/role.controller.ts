import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { RoleService } from "../../application/services/role.service";
import { Roles } from "../../../auth/infrastructure/decorators/roles.decorator";
import { RoleEnum } from "../../domain/enums/role.enum";

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Roles(RoleEnum.ADMIN)
    @Get()
    getRoles() {
        return this.roleService.getAll()
    }
}