import { EntityRepository, Repository } from 'typeorm';
import { Hall } from './hall.entity';
import { HallDto } from './dto/hall.dto';

@EntityRepository(Hall)
export class HallRepository extends Repository<Hall> {
    async createHall(hallDto: HallDto): Promise<Hall> {
        const { name, countOfSeats } = hallDto;
        const hall = new Hall();
        hall.name = name;
        hall.countOfSeats = countOfSeats;

        await hall.save();

        return hall;
    }
}