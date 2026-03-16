import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "./config.js";

function createToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export { createToken };
