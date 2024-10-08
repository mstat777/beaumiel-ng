import express, { Express, Request, Response } from "express";
import cors from 'cors';
import router from './router/index.routes';
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
const PORT = process.env.LOCAL_PORT;

app.use(express.static('../../client/build'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v.0.1", router);
app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ msg: "not found"});
})

app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));