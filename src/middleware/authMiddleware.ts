import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from "express";
import dotenv from "dotenv";

dotenv.config();

const {TOKEN_SECRET} = process.env

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization

    try {
        if (!authorizationHeader) {
            res.status(401)
            res.json('Access denied, no token')
        } else {
            const token = authorizationHeader.split(' ')[1]
            // @ts-ignore
            jwt.verify(token, TOKEN_SECRET)
            next()
        }
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}