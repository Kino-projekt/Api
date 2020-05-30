import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { UserService } from '../src/user/user.service';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import * as config from 'config';

describe('User', () => {
    let app: INestApplication;
    const userService = { getUsers: () => ['test'] };
    const dbConfig = config.get('db');

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                UserModule,
                TypeOrmCoreModule.forRoot({
                    type: dbConfig.type,
                    host: process.env.HOSTNAME || dbConfig.host,
                    port: process.env.RDS_PORT || dbConfig.port,
                    username: process.env.USERNAME || dbConfig.username,
                    password: process.env.PASSWORD || dbConfig.password,
                    database: process.env.DB_NAME || dbConfig.database,
                    entities: [__dirname + '/../**/*.entity.{js,ts}'],
                    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
                }),
            ],
        }).overrideProvider(UserService).useValue(userService).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('GET /users', async () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .expect(userService.getUsers());
    });

    afterAll(async () => {
        await app.close();
    });
});
