import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Movie } from '../movie/movie.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    content: string

    @ManyToOne(type => User, user => user.comments, { eager: false })
    author: User

    @Exclude()
    @Column()
    authorId: number;

    @Exclude()
    @ManyToOne(type => Movie, movie => movie.comments, { eager: false })
    movie: Movie

    @Exclude()
    @Column()
    movieId: number;
}