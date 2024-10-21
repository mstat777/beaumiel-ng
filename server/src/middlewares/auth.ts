import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 
import { UserToken } from "../model/types";
dotenv.config();

const { SK } = process.env;

export const auth: RequestHandler = async (req, res, next) => {
    try {
        if (req.headers.authorization){
            const TOKEN = req.headers.authorization.slice(7);

            if (TOKEN === undefined || TOKEN === null) {
                res.status(401).json({ msg: "Access denied! Missing or empty token."});
                return;
            } else {
                jwt.verify(TOKEN, SK as string, (err, decoded) => {
                    if (err) {
                        console.log(err);
                        res.status(401).json({ msg: "Invalid token!", err});
                        return;
                    }
                    const userData: UserToken = decoded as UserToken;
                    req.params = userData;
                    next();
                });
            }
        } else {
            res.status(401).json({ msg: "Access denied! Missing Authorization header."});
            return;
        }
    } catch (err) {
        res.status(500).json({err});
        return;
    }
}