import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ArticleStatus } from '../article-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleStatusValidationPipe implements PipeTransform {

    @ApiProperty()
    readonly allowedStatuses = [
        ArticleStatus.ACTIVE,
        ArticleStatus.INACTIVE
    ]

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.iStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }

        return value;
    }

    private iStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);

        return idx !== -1;
    }
}