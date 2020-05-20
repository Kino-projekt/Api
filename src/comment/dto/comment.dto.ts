import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, MaxLength, MinLength } from 'class-validator';

export class CommentDto {
    @ApiProperty({ minLength: 1, maxLength: 256 })
    @IsString()
    @MinLength(1)
    @MaxLength(256)
    content: string;

    @ApiProperty()
    @IsNumberString()
    movieId: number;
}