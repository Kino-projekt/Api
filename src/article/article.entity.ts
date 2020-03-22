import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleStatus } from './article-status.enum';
import { User } from '../user/user.entity';

@Entity()
export class Article extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty()
    description: string;

    @Column()
    @ApiProperty()
    status: ArticleStatus;

    @Column()
    @ApiProperty()
    createdAt: Date;

    @ManyToOne(type => User, user => user.articles, { eager: false })
    user: User;

    @Column()
    userId: number;
}