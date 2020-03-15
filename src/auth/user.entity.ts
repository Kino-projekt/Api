import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    salt: string;
}