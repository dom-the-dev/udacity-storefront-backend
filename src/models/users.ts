import Client from "../database";
import {checkPassword, hashPassword} from "../helpers/passwordHelper";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const {TOKEN_SECRET} = process.env;

export type UserPrototype = {
    firstname: string,
    lastname: string,
    password: string
}

export type User = {
    id: number,
    firstname: string,
    lastname: string,
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users";

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users WHERE id=($1)";

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];

        } catch (err) {
            throw new Error(`Could not get user. Error: ${err}`);
        }

    }

    async create(u: UserPrototype): Promise<User> {
        try {
            const conn = await Client.connect();

            const sql = "INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *";

            const hash = hashPassword(u.password);

            const result = await conn.query(sql, [u.firstname, u.lastname, hash]);

            conn.release();

            return result.rows[0];

        } catch (err) {
            throw new Error(`Could not create user. Error: ${err}`);
        }


    }

    async delete(id: number): Promise<string> {
        try {
            const sql = "DELETE FROM users WHERE id=($1)";
            const conn = await Client.connect();

            await conn.query(sql, [id]);

            conn.release();

            return "User successfully deleted";

        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }

    async login(firstname: string, lastname: string, password: string): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users WHERE firstname=($1) AND lastname=($2)";
            const result = await conn.query(sql, [firstname, lastname]);

            const user = result.rows[0];

            if (user && await checkPassword(password, user.password)) {
                // @ts-ignore
                return jwt.sign(user, TOKEN_SECRET);
            } else {
                return "No user found";
            }

        } catch (err) {
            throw new Error("Could not get user");
        }

    }
}