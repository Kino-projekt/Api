import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { AuthModule } from '../src/auth/auth.module';
import { UserRole } from '../src/user/user-role.enum';
import { Repository } from 'typeorm';
import { User } from '../src/user/user.entity';
import { typeOrmConfig } from '../src/config/typeorm.config';

describe('Auth', () => {
    let app: INestApplication;
    let repository: Repository<User>;
    const userData = {
        'email': 'test@testowy.pl',
        'password': 'Testowe123!',
    };
    const userDataWithBadPassword = {
        'email': 'test@testowy.pl',
        'password': 'test',
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                TypeOrmCoreModule.forRoot(typeOrmConfig),
            ],
        }).compile();

        repository = moduleFixture.get('UserRepository');
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Registration /signup', async () => {
        const { body } = await request(app.getHttpServer())
            .post('/auth/signup')
            .send(userData)
            .expect(201)
        ;

        expect(body).toEqual({
            'email': userData.email,
            'role': UserRole.CUSTOMER,
            'id': expect.any(Number),
        });
    });

    it('Registration with existing email /signup', async () => {
        const { body } = await request(app.getHttpServer())
            .post('/auth/signup')
            .send(userData)
            .expect(409)
        ;

        expect(body).toEqual({
            'error': 'Email already exists',
            'message': 'Conflict',
            'statusCode': 409,
        });
    });

    it('Registration with bad password credentials /signup', async () => {
        const { body } = await request(app.getHttpServer())
            .post('/auth/signup')
            .send(userDataWithBadPassword)
            .expect(400)
        ;

        expect(body).toEqual({
            'error': [
                'The password must be between 6 and 20 characters, one upper case letter and one lower case letter',
                'password must be longer than or equal to 6 characters',
            ],
            'message': 'Bad Request',
            'statusCode': 400,
        });
    });

    it('Sign in /signin', async () => {
        const { body } = await request(app.getHttpServer())
            .post('/auth/signin')
            .send(userData)
            .expect(200)
        ;

        expect(body).toEqual([
            {
                'email': userData.email,
                'role': UserRole.CUSTOMER,
                'id': expect.any(Number),
            },
            {
                'accessToken': expect.any(String),
            },
        ]);
    });

    it('Sign in with bad credentials /signin', async () => {
        const { body } = await request(app.getHttpServer())
            .post('/auth/signin')
            .send(userDataWithBadPassword)
            .expect(400)
        ;

        expect(body).toEqual({
            'error': [
                "The password must be between 6 and 20 characters, " +
                "one upper case letter and one lower case letter",
                "password must be longer than or equal to 6 characters"
            ],
            'message': "Bad Request",
            'statusCode': 400,
        });
    });

    afterAll(async () => {
        await repository.query(`DELETE FROM "user";`);
        await app.close();
    });
});
