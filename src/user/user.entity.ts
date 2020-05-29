import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../article/article.entity';
import { UserRole } from './user-role.enum';
import { Comment } from '../comment/comment.entity';
import { Booking } from '../booking/booking.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    salt: string;

    @Column()
    role: UserRole;

    @Column({ default: false })
    @Exclude()
    banned: boolean;

    @Exclude()
    @OneToMany(type => Article, article => article.user, { eager: true })
    articles: Article[];

    @Exclude()
    @OneToMany(type => Comment, comment => comment.author, { eager: false })
    comments: Comment[];

    @Exclude()
    @OneToMany(type => Booking, booking => booking.user, { eager: false })
    bookings: Booking[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password
    }
}