import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ArticleDto {
    @ApiProperty({ minLength: 3, maxLength: 50 })
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    title: string;

    @ApiProperty({ minLength: 3, maxLength: 300 })
    @IsString()
    @MinLength(3)
    @MaxLength(300)
    description: string;
}