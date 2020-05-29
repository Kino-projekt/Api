import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class HallDto {
    @ApiProperty({ minLength: 2, maxLength: 20 })
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    name: string;

    @ApiProperty({ minLength: 1, maxLength: 100 })
    @IsNumber()
    @Min(1)
    @Max(100)
    countOfSeats: number;
}