import { EntityRepository, Repository } from 'typeorm';
import { Seance } from './seance.entity';
import { Movie } from '../movie/movie.entity';
import { Hall } from '../hall/hall.entity';

@EntityRepository(Seance)
export class SeanceRepository extends Repository<Seance> {
    async createSeance(movie: Movie, hall: Hall, date: Date): Promise<Seance> {
        const seance = new Seance();
        seance.movie = movie;
        seance.hall = hall;
        seance.date = date;
        seance.occupiedSeats = [];
        await seance.save();

        return seance;
    }
}
