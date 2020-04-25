import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { secretOrKey } from './configuration/jwtConfiguration';
import { UsersModule } from '../users/users.module';
import { mongoDBTestImport } from '../../test/mongo-utils';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        mongoDBTestImport,
        JwtModule.register({
          secretOrPrivateKey: 'secretOrKey',
          signOptions: { expiresIn: 3600 },
        }),
        UsersModule,
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
