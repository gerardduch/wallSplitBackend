import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './user.providers';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt', session: false }), DatabaseModule],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
