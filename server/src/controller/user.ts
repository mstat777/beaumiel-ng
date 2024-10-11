import { Request, Response } from "express";
import { queryWithValue, queryWithArray } from "../model/query";
import { compare, hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv'; 
dotenv.config();

const { sign } = jsonwebtoken;
const { SK } = process.env;

export const checkToken = async (req: Request, res: Response): Promise<any> => {
    try {
        const query = "SELECT id, email, role FROM users WHERE email = ? AND role = ?";
        await queryWithValue(query, req.params).then((user) => {
            return res.status(200).json({ 
                msg: "authentifié",
                userID: user[0].id,
                email: user[0].email, 
                accountType: user[0].role});
        }).catch((err) => {
            return res.status(500).json({message: err.message,err});
        });
    } catch (err) {
        //throw Error(err);
        console.log(err);
    }
}

// log an user (if exists) and create a token
export const userSignIn = async (req: Request, res: Response): Promise<any> => {
    try {
        //console.log("userSignIn");
        let msg: string = "";
        const query = "SELECT id, email, password, role FROM users WHERE email = ?";
        //console.log(req.body);
        //console.log(req.body.email);
        const [user] = await queryWithValue(query, req.body.email);
        //console.log(user.password);
        if (user) {
            const same = await compare(req.body.password, user.password);

            if (same) {
                //console.log("mdp correct");
                const TOKEN = sign({email: user.email, role: user.role}, SK as string);
                res.status(200).json({ 
                    TOKEN, 
                    email: user.email, 
                    userID: user.id, 
                    role: user.role });
            } else {
                msg = "Mot de passe erroné";
                //console.log(msg);
                return res.status(409).json({ msg });
            }
        } else if (!user){
            msg = "Mauvais identifiant";
            return res.status(409).json({ msg });
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
        //console.log(queryCheckUser);
        const dataArray = [...Object.values(req.body)];
        const hashedPassword = await hash(req.body.password, 10);
        dataArray.pop();
        dataArray.push(hashedPassword);
        //console.log([...dataArray]);
        /*await queryWithValue(queryCheckUser, req.body.email).then((result) => {
            console.log(result);
            user = result; 
            console.log("it's oke");
            console.log(user.length);
        })
        .catch((err) => {
            console.log("ERROR with the query!");
        });*/

        const [user] = await queryWithValue(queryCheckUser, req.body.email);

        if (user) {
            msg = "Un utilisateur avec cette adresse mail existe déjà !";
            res.status(409).json({ msg });
        } else if (!user) {
            console.log("user doesn't existe");
            const queryCreateUser = "INSERT INTO users (name, email, password, role, date_created) VALUES (?, ?, ?, 'client', CURRENT_TIMESTAMP())";
            await queryWithArray(queryCreateUser, dataArray as []);
            msg = "Utilisateur créé";
            res.status(201).json({ msg });
        }
    } catch (err) {
        return res.status(500).json({err});
    }
}