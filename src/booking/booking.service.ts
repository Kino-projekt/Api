import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { BookingDto } from './dto/booking.dto';
import { User } from '../user/user.entity';
import { Booking } from './booking.entity';
import { SeanceRepository } from '../seance/seance.repository';

@Injectable()
export class BookingService {
    constructor(
        private bookingRepository: BookingRepository,
        private seanceRepository: SeanceRepository
    ) {}

    async create(bookingDto: BookingDto, user: User): Promise<Booking> {
        const { seanceId, reservedSeats } = bookingDto;
        const seance = await this.seanceRepository.findOne(seanceId);

        if (!seance) {
            throw new NotFoundException('The seance does not exist');
        }

        await this.checkIfSeatsAreFree(seance.occupiedSeats, reservedSeats);

        return this.bookingRepository.createBooking(seance, user, reservedSeats);
    }

    async checkIfSeatsAreFree(occupiedSeats: number[], reservedSeats: number[]): Promise<void> {
        if (occupiedSeats === null) {
            return;
        }
        reservedSeats.forEach((value) => {
            if (occupiedSeats.includes(value)) {
                throw new UnprocessableEntityException();
            }
        })
    }
}
