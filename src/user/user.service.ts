import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserRole } from './user-role.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.getUsers();
    }

    async getUserById(id: number): Promise<User> {
        const found = await this.userRepository.findOne({ where: { id }})

        if (!found) {
            throw new NotFoundException()
        }

        return found;
    }

    async ban(id: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id }});

        if (!user) {
            throw new NotFoundException();
        }

        if (user.role.includes(UserRole.ADMIN)) {
            throw new ForbiddenException();
        }

        user.banned = true;
        await user.save();
    }

    async updateRole(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id }});

        if (!user) {
            throw new NotFoundException();
        }

        user.role = UserRole.ADMIN;
        await user.save();

        return user;
    }
}
