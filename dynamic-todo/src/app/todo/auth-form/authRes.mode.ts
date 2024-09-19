export interface AuthRes {
  email: string;
  localId: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}
