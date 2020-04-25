import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload, UserJwt } from '../jwt.interface';
import { secretOrKey } from '../configuration/jwtConfiguration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // todo: change the secret key ...
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey,
    });
  }

  async validate(payload: JwtPayload): Promise<UserJwt> {
    const userJwt = await this.authService.validateUserByJwt(payload);

    if (!userJwt) {
      throw new UnauthorizedException();
    }

    return userJwt;
  }
}
