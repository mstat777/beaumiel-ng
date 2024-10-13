import { Router } from 'express';
import { getInfoByLang } from '../controller/honey';
import userRoutes from './user.routes';

const router = Router();

router.use("/user", userRoutes);

router.get("/honeys/:lang", getInfoByLang);

export default router;