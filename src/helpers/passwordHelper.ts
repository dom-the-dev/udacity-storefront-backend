import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// @ts-ignore
const saltRounds: string = process.env.SALT_ROUNDS;
// @ts-ignore
const pepper: string = process.env.BCRYPT_PASSWORD;

export const hashPassword = (password: string): string => {

    return bcrypt.hashSync(
        password + pepper,
        parseInt(saltRounds)
    );
};

export const checkPassword = (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password + pepper, hashedPassword);
};