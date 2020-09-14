export interface TokenAuthProvider {
  getToken(audience: string): string;
}
