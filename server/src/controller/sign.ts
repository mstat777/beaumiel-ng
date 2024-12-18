import { Request, Response } from "express";
import { queryWithValue, queryWithArray, queryWithObject } from "../model/query";
import { compare, hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv'; 
dotenv.config();

const { sign } = jsonwebtoken;
const { SK } = process.env;

export const checkToken = async (req: Request, res: Response): Promise<any> => {
    try {
        const query = "SELECT id, email, role FROM users WHERE email = ? AND role = ?";
        await queryWithObject(query, req.params).then((user) => {
            return res.status(200).json({ 
                status: "authenticated",
                userId: user[0].id,
                email: user[0].email, 
                role: user[0].role
            });
        }).catch((err) => {
            return res.status(500).json([{err}]);
        });
    } catch (err) {
        res.status(500).json({err});
        return;
    }
}

// log an user (if exists) and create a token
export const userSignIn = async (req: Request, res: Response): Promise<any> => {
    try {
        let msg: string = "";
        const query = "SELECT id, email, password, role FROM users WHERE email = ?";
        const user = await queryWithValue(query, req.body.email);
        if (user.length) {
            const same = await compare(req.body.password, user[0].password);
            if (same) {
                const TOKEN = sign(
                    {email: user[0].email, 
                     role: user[0].role}, 
                    SK as string
                );
                res.status(200).json({ 
                    token: TOKEN, 
                    role: user[0].role 
                });
            } else {
                msg = "Mot de passe erroné";
                return res.status(409).json([{ msg }]);
            }
        } else if (!user.length){
            msg = "Mauvais identifiant";
            return res.status(409).json([{ msg }]);
        }
    } catch (err) {
        return res.status(500).json({err});
    }
}

// register a new user account
export const createUserAccount =  async (req: Request, res: Response): Promise<any> => {
    try {
        let msg: string = "";
        const queryCheckUser = "SELECT email FROM users WHERE email = ?";
        const dataArray = [...Object.values(req.body)];
        const hashedPassword = await hash(req.body.password, 10);
        dataArray.pop();
        dataArray.push(hashedPassword);

        const user = await queryWithValue(queryCheckUser, req.body.email);

        if (user.length) {
            msg = "Un utilisateur avec cette adresse mail existe déjà !";
            res.status(409).json({ msg });
        } else if (!user.length) {
            const queryCreateUser = "INSERT INTO users (firstname, lastname, email, password, role, date_created) VALUES (?, ?, ?, ?, 'client', CURRENT_TIMESTAMP())";
            await queryWithArray(queryCreateUser, dataArray as []);
            msg = "User created successfully";
            res.status(201).json({ msg });
        }
    } catch (err) {
        return res.status(500).json({err});
    }
}