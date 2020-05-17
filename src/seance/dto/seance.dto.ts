import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumberString } from 'class-validator';

export class SeanceDto {
    @ApiProperty()
    @IsNumberString()
    movieId: number;

    @ApiProperty()
    @IsNumberString()
    hallId: number;

    @ApiProperty()
    @IsDateString()
    date: Date
}