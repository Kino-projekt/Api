import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class HallDto {
    @ApiProperty({ minLength: 2, maxLength: 10 })
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    name: string;
}