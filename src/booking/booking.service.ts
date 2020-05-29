import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { BookingDto } from './dto/booking.dto';
import { User } from '../user/user.entity';
import { Booking } from './booking.entity';
import { SeanceRepository } from '../seance/seance.repository';
import { HallRepository } from '../hall/hall.repository';

@Injectable()
export class BookingService {
    constructor(
        private bookingRepository: BookingRepository,
        private seanceRepository: SeanceRepository,
        private hallRepository: HallRepository
    ) {}

    async create(bookingDto: BookingDto, user: User): Promise<Booking> {
        const { seanceId, reservedSeats } = bookingDto;
        const seance = await this.seanceRepository.findOne(seanceId);

        if (!seance) {
            throw new NotFoundException('The seance does not exist');
        }

        const hall = await this.hallRepository.findOne(seance.hallId);
        await this.checkIfSeatsAreFree(seance.occupiedSeats, reservedSeats, hall.countOfSeats);

        return this.bookingRepository.createBooking(seance, user, reservedSeats);
    }

    async checkIfSeatsAreFree(occupiedSeats: number[], reservedSeats: number[], maxNumberOfSeat: number): Promise<void> {
        if (occupiedSeats === null) {
            return;
        }
        reservedSeats.forEach((value) => {
            if (occupiedSeats.includes(value) || value > maxNumberOfSeat) {
                throw new UnprocessableEntityException();
            }
        })
    }
}
