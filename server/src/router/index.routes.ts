import { Router } from 'express';
import { getAllInfo,
        getInfoByLang } from '../controller/honey';
import userRoutes from './user.routes';

const router = Router();

router.use("/user", userRoutes);

router.get("/honeys/:lang", getInfoByLang);
router.get("/honeys", getAllInfo);

export default router;