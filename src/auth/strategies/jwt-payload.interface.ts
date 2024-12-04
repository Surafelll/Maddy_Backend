// jwt-payload.interface.ts
export interface JwtPayload {
  username: string; // The username or any unique identifier for the user
  sub: string; // The 'sub' field is typically the user ID (or any unique identifier)
}
