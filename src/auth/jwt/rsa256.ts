import { sign } from "jsonwebtoken";

export class RSA256Signer {
  private privateKey: string;
  private keyId: string;
  private issuer: string;
  private subjectId: string;

  constructor(opts: RSA256SignerOptions) {
    this.privateKey = opts.privateKey;
    this.keyId = opts.keyId;
    this.issuer = opts.issuer;
    this.subjectId = opts.subjectId;
  }

  public getToken(audience: string): string {
    return sign({}, this.privateKey, {
      algorithm: "RS256",
      expiresIn: "5m",
      keyid: this.keyId,
      audience: audience,
      issuer: this.issuer,
      subject: this.subjectId,
    });
  }
}

export interface RSA256SignerOptions {
  privateKey: string;
  keyId: string;
  issuer: string;
  subjectId: string;
}
