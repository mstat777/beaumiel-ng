import { Router } from 'express';
import { getHoneysByLang,
        getPackagings } from '../controller/honey';
        
const router = Router();

router.get("/main/:lang", getHoneysByLang);
router.get("/packagings/:honeyId", getPackagings);

export default router;