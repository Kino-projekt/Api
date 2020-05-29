import { EntityRepository, Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Seance } from '../seance/seance.entity';
import { User } from '../user/user.entity';

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
    async createBooking(seance: Seance, user: User, reservedSeats: number[]): Promise<Booking> {
        const booking = new Booking();
        booking.seance = seance;
        booking.user = user;
        booking.reservedSeats = [];
        reservedSeats.forEach((value) => {
            seance.occupiedSeats.push(value);
            booking.reservedSeats.push(value);
        });
        booking.createdAt = new Date();
        await booking.save();
        await seance.save();

        return booking;
    }
}