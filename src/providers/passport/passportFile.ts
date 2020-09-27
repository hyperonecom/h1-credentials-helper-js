import { homedir } from "os";
import { join } from "path";
import { readFileSync } from "fs";

export const loadPassportFile = (location?: string): PassportFile => {
  location ??= getDefaultPassportLocation();

  let passportFile: string;
  try {
    passportFile = readFileSync(location, "utf-8");
  } catch (e) {
    throw new Error(`Error when loading passport file: ${e}`);
  }

  let passportObject: PassportFile;
  try {
    passportObject = JSON.parse(passportFile);
  } catch (e) {
    throw new Error(`Error when parsing passport file: ${e}`);
  }

  validatePassportFile(passportObject);
  return passportObject;
};

export const validatePassportFile = (file: PassportFile) => {
  if (!file.issuer) {
    throw new Error("Issuer is empty");
  }
  if (!file.certificate_id) {
    throw new Error("CertificateID is empty");
  }
  if (!file.private_key) {
    throw new Error("Private key is missing");
  }
  if (!file.subject_id) {
    throw new Error("Subject is missing");
  }
};

const getDefaultPassportLocation = (): string => {
  return join(homedir(), ".h1", "passport.json");
};

export interface PassportFile {
  subject_id: string;
  certificate_id: string;
  issuer: string;
  private_key: string;
  public_key?: string;
}
