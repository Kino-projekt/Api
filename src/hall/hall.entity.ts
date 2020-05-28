import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Seance } from '../seance/seance.entity';

@Entity()
export class Hall extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    countOfSeats: number;

    @OneToMany(type => Seance, seance => seance.hall, { eager: false })
    seances: Seance[]
}