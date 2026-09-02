import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateReassignmentDto {
    @ApiProperty({
        description: "Add the reassignment's ticket id"
    })
    @IsUUID()
    @IsNotEmpty()
    ticketId!: string;

    @ApiProperty({
        description: "Add the reassignment's last user id"
    })
    @IsUUID()
    @IsNotEmpty()
    lastUserId!: string;

    @ApiProperty({
        description: "Add the reassignment's new user id"
    })
    @IsUUID()
    @IsNotEmpty()
    newUserId!: string;

    @ApiProperty({
        description: "Add the reassignment's created by user id"
    })
    @IsUUID()
    @IsNotEmpty()
    createdById!: string;
}