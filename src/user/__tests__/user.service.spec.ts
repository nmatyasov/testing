import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { RefreshToken, User,  } from '../entity';
import { UserService } from '../user.service';
import { Repository} from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Poll, PollOption, Vote } from '../../poll/entity';
import { INestApplication } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let moduleRef: TestingModule;
  let repository: Repository<User>;
  let app: INestApplication;
  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User, Poll, PollOption, Vote]),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'root',
          password: 'XLynMDz2p3755Ac1dn1Dj98CsK',
          database: 'test',
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
          entities: [User, Poll, PollOption, Vote],
          logging: true
        }),
      ],
      providers: [
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(RefreshToken),
          useClass: Repository,
        },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    userService = moduleRef.get<UserService>(UserService);
    await app.init();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  describe('findAll', () => {
    it('returns empty array', async () => {
      expect(await userService.findAll()).toStrictEqual([]);
    });
  });
});
