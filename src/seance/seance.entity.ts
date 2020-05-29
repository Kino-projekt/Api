import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../movie/movie.entity';
import { Hall } from '../hall/hall.entity';
import { Exclude } from 'class-transformer';
import { Booking } from '../booking/booking.entity';

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

    @Exclude()
    @OneToMany(type => Booking, booking => booking.seance, { eager: false })
    bookings: Booking[];

    @Column({ nullable: true })
    date: Date;
}