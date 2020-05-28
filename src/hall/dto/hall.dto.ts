import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class HallDto {
    @ApiProperty({ minLength: 2, maxLength: 10 })
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    name: string;

    @IsNumber()
    @Min(1)
    @Max(100)
    countOfSeats: number;
}