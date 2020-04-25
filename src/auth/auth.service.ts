import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload, UserJwt } from './jwt.interface';

@Injectable()
export class AuthService {
  // todo: change the auth service to something more safe. Not JWT for economic transactions.
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUserByPassword(loginAttempt: LoginUserDto): Promise<UserJwt> {
    const userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);
    if (!userToAttempt) {
      throw new UnauthorizedException();
    }

    return new Promise((resolve) => {
      userToAttempt.checkPassword(loginAttempt.password, (err: Error, isMatch: boolean) => {
        if (err || !isMatch) {
          throw new UnauthorizedException();
        }
        resolve(this.createJwtPayload(userToAttempt));
      });
    });
  }

  async validateUserByJwt({ email }: JwtPayload): Promise<UserJwt> {
    const user = await this.usersService.findOneByEmail(email);
    if (!Boolean(user)) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user);
  }

  createJwtPayload(user): UserJwt {
    const data: JwtPayload = { email: user.email };
    const jwt = this.jwtService.sign(data);
    return {
      expiresIn: 3600,
      accessToken: jwt,
    };
  }
}
