import { Request, Response } from "express";
import { find } from "../model/query";

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const query = "SELECT * FROM users";
        await find(query).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({message: err.message,err});
        });
    } catch (err) {
        return res.status(500).json({err});
    }
}