import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
}