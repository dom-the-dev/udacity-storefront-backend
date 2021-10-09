import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds: string = process.env.SALT_ROUNDS ?? "10";
const pepper: string = process.env.BCRYPT_PASSWORD ?? "default";

export const hashPassword = (password: string): string => {

    return bcrypt.hashSync(
        password + pepper,
        parseInt(saltRounds)
    );
};
