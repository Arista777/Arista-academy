import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByUsername,
  findUserByUsernameForRegistration,
} from "../models/userModel.js";
import { createToken } from "../utils/tokens.js";

async function register({ username, password, role }) {
  const existing = await findUserByUsernameForRegistration(username);
  if (existing) {
    const error = new Error("Username already exists");
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(username, passwordHash, role);
  const token = createToken(user);

  return { token, user: { id: user.id, username: user.username, role: user.role } };
}

async function login({ username, password }) {
  const user = await findUserByUsername(username);

  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const token = createToken(user);

  return { token, user: { id: user.id, username: user.username, role: user.role } };
}

export { register, login };
