import { PassportFile, validatePassportFile } from "./passportFile";

describe("passportFile loading", () => {});

describe("passportFile validation", () => {
  it("throws an error when required property is missing", () => {
    const expectedErrors: ExpectedValidationError[] = [
      { missingProperty: "subject_id", expectedMessage: "Subject is missing" },
      {
        missingProperty: "certificate_id",
        expectedMessage: "CertificateID is empty",
      },
      {
        missingProperty: "issuer",
        expectedMessage: "Issuer is empty",
      },
      {
        missingProperty: "private_key",
        expectedMessage: "Private key is missing",
      },
    ];

    expectedErrors.forEach((expectedError) => {
      const { missingProperty, expectedMessage } = expectedError;
      const mock = getInvalidPassportMock(missingProperty);
      expect(() => {
        validatePassportFile(mock as PassportFile);
      }).toThrow(expectedMessage);
    });
  });
});

const passportMock: PassportFile = {
  subject_id: "string",
  certificate_id: "string",
  issuer: "string",
  private_key: "string",
};

const getInvalidPassportMock = (
  missingProperty: keyof PassportFile
): PassportFile => {
  const mock: PassportMock = Object.assign({}, passportMock);
  mock[missingProperty] = undefined;
  return mock as PassportFile;
};

interface ExpectedValidationError {
  missingProperty: keyof PassportFile;
  expectedMessage: string;
}

interface PassportMock {
  subject_id?: string;
  certificate_id?: string;
  issuer?: string;
  private_key?: string;
  public_key?: string;
}
