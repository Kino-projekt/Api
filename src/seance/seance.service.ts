import { Injectable, NotFoundException } from '@nestjs/common';
import { SeanceRepository } from './seance.repository';
import { SeanceDto } from './dto/seance.dto';
import { Seance } from './seance.entity';
import { MovieRepository } from '../movie/movie.repository';
import { HallRepository } from '../hall/hall.repository';

@Injectable()
export class SeanceService {
    constructor(
        private seanceRepository: SeanceRepository,
        private movieRepository: MovieRepository,
        private hallRepository: HallRepository
    ) {}

    async create(seanceDto: SeanceDto): Promise<Seance> {
        const { movieId, hallId} = seanceDto;

        const movie = await this.movieRepository.findOne(movieId);
        const hall = await this.hallRepository.findOne(hallId);

        if (!movie || !hall) {
            throw new NotFoundException();
        }

        return this.seanceRepository.createSeance(movie, hall);
    }

    async getSeances(): Promise<Seance[]> {
        return await this.seanceRepository.find();
    }

    async getSeanceById(id: number): Promise<Seance> {
        const seance = await this.seanceRepository.findOne(id);

        if (!seance) {
            throw new NotFoundException();
        }

        return seance;
    }

    async delete(id: number): Promise<void> {
        const result = await this.seanceRepository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }
}
