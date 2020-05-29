import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumberString } from 'class-validator';

export class BookingDto {
    @ApiProperty()
    @IsNumberString()
    seanceId: number;

    @ApiProperty()
    @IsArray()
    reservedSeats: number[];
}