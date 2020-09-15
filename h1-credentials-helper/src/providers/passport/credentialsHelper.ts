import { RSA256Signer } from "../../auth/jwt";
import { TokenAuthProvider } from "../providers";
import { loadPassportFile } from "./passportFile";

export const getCredentialsHelper = (location?: string): TokenAuthProvider => {
  const passport = loadPassportFile(location);
  const signer = new RSA256Signer({
    privateKey: passport.private_key,
    keyId: passport.certificate_id,
    issuer: passport.issuer,
    subjectId: passport.subject_id,
  });

  return signer;
};
