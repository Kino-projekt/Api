import { Injectable, NotFoundException } from '@nestjs/common';
import { HallRepository } from './hall.repository';
import { HallDto } from './dto/hall.dto';
import { Hall } from './hall.entity';

@Injectable()
export class HallService {
    constructor(private hallRepository: HallRepository) {}

    async create(hallDto: HallDto): Promise<Hall> {
        return await this.hallRepository.createHall(hallDto);
    }

    async delete(id: number): Promise<void> {
        const result  = await this.hallRepository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }

    async getHalls(): Promise<Hall[]> {
        return await this.hallRepository.find();
    }

    async getHallById(id: number): Promise<Hall> {
        const hall = await this.hallRepository.findOne({ id });

        if (hall == null) {
            throw new NotFoundException();
        }

        return hall;
    }
}
