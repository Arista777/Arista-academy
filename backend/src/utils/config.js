const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "12h";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "";

const DB_CONFIG = {
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "academy",
  port: Number(process.env.DB_PORT || 5432),
};

export { PORT, JWT_SECRET, JWT_EXPIRES_IN, YOUTUBE_API_KEY, DB_CONFIG };
