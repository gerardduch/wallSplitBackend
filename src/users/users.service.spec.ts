import { Test, TestingModule } from '@nestjs/testing';
import { Mongoose } from 'mongoose';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { usersProviders } from './user.providers';
import { TestDatabaseModule } from '../test/database/testDatabase.module';
import { testDatabaseProviders } from '../test/database/testDatabase.providers';
import { DATABASE_CONNECTION } from '../constants';
import { dropAllCollections } from '../test/mongo-utils';

describe('UsersService', () => {
  let usersService: UsersService;
  let connection!: Mongoose;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ...usersProviders, ...testDatabaseProviders],
      imports: [TestDatabaseModule],
    }).compile();

    connection = module.get<Mongoose>(DATABASE_CONNECTION);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await dropAllCollections(connection);
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('create & save user successfully', async () => {
    const userDto: CreateUserDto = {
      email: 'gerard@email.com',
      password: 'test',
      firstName: 'Gerard',
      lastName: 'gerard',
    };

    const savedUser: User = await usersService.create(userDto);

    expect(savedUser.id).toBeDefined();
    expect(savedUser.email).toBe(userDto.email);
    expect(savedUser.firstName).toBe(userDto.firstName);
    expect(savedUser.lastName).toBe(userDto.lastName);
    expect((savedUser as any).password).toBeUndefined();
  });
});
