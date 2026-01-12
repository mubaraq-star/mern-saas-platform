export interface JwtPayload {
  sub: string; // user id
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}
