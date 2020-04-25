import { UserJwt } from '../auth/jwt.interface';
import { User } from '../users/user.interface';

export interface AuthenticateResponse {
  user: User;
  userJwt: UserJwt;
}

export interface Credentials {
  email: string;
  password: string;
}
