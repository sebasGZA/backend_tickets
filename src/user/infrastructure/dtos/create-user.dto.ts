import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'Type the user name'
    })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({
        description: 'Type the user email'
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({
        description: 'Type the user password'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string;


    @ApiProperty({
        description: 'Type the user roleId'
    })
    @IsUUID()
    @IsNotEmpty()
    roleId!: string

    @ApiProperty({
        description: 'Type true if the user is Active or false if the user is not active'
    })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean
}