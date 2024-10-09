import { Router } from 'express';
import { getAllInfo,
        getInfoByLang } from '../controller/honey';

const router = Router();

router.get("/honeys/:lang", getInfoByLang);
router.get("/honeys", getAllInfo);

export default router;