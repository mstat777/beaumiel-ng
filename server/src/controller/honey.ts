import { Request, Response } from "express";
import { find } from "../model/query";

export const getInfoByLang = async (req: Request, res: Response): Promise<any> => {
    try {
        const lang = req.params.lang;
        // get only the current language translations:
        const columns = `h.name_${lang} AS name, h.subtitle_${lang} AS subtitle, h.description_${lang} AS description`;
        const query = "SELECT h.id, "+columns+", p.price FROM honeys AS h JOIN packagings AS p ON p.honey_id = h.id WHERE p.package = '250'";
        await find(query).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({message: err.message,err});
        });
    } catch (err) {
        return res.status(500).json({err});
    }
}