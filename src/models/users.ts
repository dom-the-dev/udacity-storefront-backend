import Client from "../database";
import {hashPassword} from "../helpers/hashPassword";

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
}