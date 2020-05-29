import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Seance } from '../seance/seance.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Booking extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column("int", { array: true })
    @ApiProperty()
    reservedSeats: number[];

    @ManyToOne(type => Seance, seance => seance.bookings, { eager: true })
    seance: Seance;

    @Exclude()
    @Column()
    seanceId: number;

    @Column()
    @ApiProperty()
    createdAt: Date;

    @Exclude()
    @ManyToOne(type => User, user => user.bookings, { eager: false })
    user: User;

    @Column()
    userId: number;
}