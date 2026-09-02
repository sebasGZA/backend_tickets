import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {

    @ApiProperty({
        description: "Type the comment's content"
    })
    @IsNotEmpty()
    @IsString()
    content!: string;

    @ApiProperty({
        description: "Type the comment's ticket id"
    })
    @IsNotEmpty()
    @IsUUID()
    ticketId!: string
}