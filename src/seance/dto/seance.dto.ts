import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class SeanceDto {
    @ApiProperty()
    @IsNumberString()
    movieId: string;

    @ApiProperty()
    @IsNumberString()
    hallId: number;
}