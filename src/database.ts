import dotenv from "dotenv";
import {Pool} from "pg";

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env;

const client = new Pool({
    host: POSTGRES_HOST,
    database: ENV === "test" ? POSTGRES_DB_TEST : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});

export default client;