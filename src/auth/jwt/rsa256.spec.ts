import { RSA256Signer } from "./rsa256";

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgGFfgMY+DuO8l0RYrMLhcl6U/NigNIiOVhoo/xnYyoQALpWxBaBR
+iVJiBUYunQjKA33yAiY0AasCfSn1JB6asayQvGGn73xztLjkeCVLT+9e4nJ0A/o
dK8SOKBg9FFe70KJrWjJd626el0aVDJjtCE+QxJExA0UZbQp+XIyveQXAgMBAAEC
gYBHcL1XNWLRPaWx9GlUVfoGYMMd4HSKl/ueF+QKP59dt5B2LTnWhS7FOqzH5auu
17hkfx3ZCNzfeEuZn6T6F4bMtsQ6A5iT/DeRlG8tOPiCVZ/L0j6IFM78iIUT8XyA
miwnSy1xGSBA67yUmsLxFg2DtGCjamAkY0C5pccadaB7oQJBAKsIPpMXMni+Oo1I
kVxRyoIZgDxsMJiihG2YLVqo8rPtdErl+Lyg3ziVyg9KR6lFMaTBkYBTLoCPof3E
AB/jyucCQQCRv1cVnYNx+bfnXsBlcsCFDV2HkEuLTpxj7hauD4P3GcyLidSsUkn1
PiPunZqKpsQaIoxc/BzTOCcP19ifgqdRAkBJ8Cp9FE4xfKt7YJ/WtVVCoRubA3qO
wdNWPa99vgQOXN0lc/3wLevSXo8XxRjtyIgJndT1EQDNe0qglhcnsiaJAkBziAcR
/VAq0tZys2szf6kYTyXqxfj8Lo5NsHeN9oKXJ346xkEtb/VsT5vQFGJishsU1HoL
Y1W+IO7l4iW3G6xhAkACNwtqxSRRbVsNCUMENpKmYhsyN8QXJ8V+o2A9s+pl21Kz
HIIm179mUYCgO6iAHmkqxlFHFwprUBKdPrmP8qF9
-----END RSA PRIVATE KEY-----`;

describe("rsa256 JWT signer", () => {
  const signer = new RSA256Signer({
    privateKey,
    keyId: "keyId",
    issuer: "issuer",
    subjectId: "subjectId",
  });

  it("properly creates token", () => {
    const token = signer.getToken("audience");

    const segments = token.split(".");
    expect(segments.length).toBe(3);

    const header = decodeB64ToJson(segments[0]);
    const payload = decodeB64ToJson(segments[1]) as TokenPayload;

    expect(header).toStrictEqual({
      alg: "RS256",
      kid: "keyId",
      typ: "JWT",
    });

    expect(payload.aud).toBe("audience");
    expect(payload.iss).toBe("issuer");
    expect(payload.sub).toBe("subjectId");
    expect(typeof payload.exp).toBe("number");
    expect(typeof payload.iat).toBe("number");
    expect(payload.exp).toBeGreaterThan(payload.iat);
  });
});

const decodeB64ToJson = (b64: string): object => {
  const buff = Buffer.from(b64, "base64");
  const obj = JSON.parse(buff.toString());
  return obj;
};

interface TokenPayload {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
}
