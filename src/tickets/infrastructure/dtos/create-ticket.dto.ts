import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTicketDto {
    @ApiProperty({
        description: "The title of the ticket",
    })
    @IsString()
    @IsNotEmpty()
    title!: string;

    @ApiProperty({
        description: "The description of the ticket",
    })
    @IsString()
    @IsNotEmpty()
    description!: string;

    @ApiProperty({
        description: "The ID of the ticket's status",
    })
    @IsNotEmpty()
    @IsUUID()
    statusId!: string;

    @ApiProperty({
        description: "The ID of the ticket's priority",
    })
    @IsNotEmpty()
    @IsUUID()
    priorityId!: string;

    @ApiProperty({
        description: "The ID of the client associated with the ticket",
    })
    @IsUUID()
    @IsNotEmpty()
    clientId!: string;

    @ApiProperty({
        description: "The ID of the user who created the ticket",
    })
    @IsNotEmpty()
    @IsUUID()
    createdById!: string;

    @ApiPropertyOptional({
        description: "The ID of the user to whom the ticket is assigned",
    })
    @IsOptional()
    @IsUUID()
    assignedToId?: string;
}