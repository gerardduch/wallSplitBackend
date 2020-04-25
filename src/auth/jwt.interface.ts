export interface JwtPayload {
  email: string;
}

export interface UserJwt {
  expiresIn: number;
  accessToken: string;
}
