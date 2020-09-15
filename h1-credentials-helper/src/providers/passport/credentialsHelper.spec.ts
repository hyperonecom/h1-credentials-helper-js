import { getCredentialsHelper } from "./credentialsHelper";
import { join } from "path";

describe("getting credentials helper", () => {
  it("properly loads valid passport and generates token", () => {
    const passportPath = join(__dirname, "fixtures", "validPassport.json");
    const tokenProvider = getCredentialsHelper(passportPath);

    expect(() => {
      tokenProvider.getToken("audience.url");
    }).not.toThrow();
  });
});
