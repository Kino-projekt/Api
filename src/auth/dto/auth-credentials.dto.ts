import { IsString, MinLength, MaxLength, Matches, IsEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'The password must be between 6 and 20 characters, one upper case letter and one lower case letter' }
    )
    password: string;
}