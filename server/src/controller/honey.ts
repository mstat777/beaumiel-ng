import { Request, Response } from "express";
import { find } from "../model/query";

export const getAll = async (req: Request, res: Response): Promise<any> => {
    try {
        const query = "SELECT * FROM honeys";
        await find(query).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            console.log(`Error ${err}`);
            return res.status(500).json({message: err.message,err});
        });
    
    } catch (err) {
        console.log(err);
        return res.status(500).json({err});
    }
}