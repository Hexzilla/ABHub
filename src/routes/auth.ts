import { Request } from "express";
import jwt from "express-jwt";

function getTokenFromHeader(req: Request) {
  if (
    (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
}

const secret = "ABHUB_SECRET_BEAUTIFUL_ADMIN_APP";

export default {
  required: jwt({
    algorithms: ["HS256"],
    secret: secret,
    userProperty: "payload",
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    algorithms: ["HS256"],
    secret: secret,
    userProperty: "payload",
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};
