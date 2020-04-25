import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthenticateResponse } from '../interfaces/authenticate';
import { UsersService } from '../users/users.service';
import { UserJwt } from './jwt.interface';
import { User } from '../users/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const userJwt: UserJwt = await this.authService.validateUserByPassword(loginUserDto);
    const user: User = await this.usersService.findOneByEmail(loginUserDto.email);
    return { user, userJwt };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthenticateResponse> {
    const user: User = await this.usersService.create(createUserDto);
    const userJwt: UserJwt = this.authService.createJwtPayload(user);
    return { user, userJwt };
  }
}
