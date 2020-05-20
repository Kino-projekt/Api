import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Seance } from '../seance/seance.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Movie extends BaseEntity {

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
    director: string;

    @Column()
    @ApiProperty()
    createdAt: Date;

    @OneToMany(type => Seance, seance => seance.movie, { eager: false })
    seances: Seance[];

    @OneToMany(type => Comment, comment => comment.movie, { eager: true })
    comments: Comment[];
}