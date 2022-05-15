import { makeVar } from "@apollo/client";
import { AuthPayloadType } from "types";

export const authPayloadVar = makeVar<AuthPayloadType | null>({
  aud: "",
  email: "",
  exp: 0,
  iat: 0,
  iss: "",
  jti: "",
  nbf: 0,
  sub: ""
});
