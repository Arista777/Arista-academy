import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config.js";

function authRequired(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authentication token" });
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: payload.sub,
      username: payload.username,
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export { authRequired };
