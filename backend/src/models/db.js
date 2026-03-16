import pkg from "pg";
import { DB_CONFIG } from "../utils/config.js";

const { Pool } = pkg;
const pool = new Pool(DB_CONFIG);

export { pool };
