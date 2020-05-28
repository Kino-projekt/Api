import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../movie/movie.entity';
import { Hall } from '../hall/hall.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Seance extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ array: true, nullable: true })
    @ApiProperty()
    occupiedSeats: number;

    @ManyToOne(type => Movie, movie => movie.seances, { eager: false })
    movie: Movie;

    @Exclude()
    @Column()
    movieId: number;

    @ManyToOne(type => Hall, hall => hall.seances, { eager: false })
    hall: Hall;

    @Exclude()
    @Column()
    hallId: number;

    @Column({ nullable: true })
    date: Date;
}