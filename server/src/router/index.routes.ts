import { Router } from 'express';
import { getAll } from '../controller/honey';

const router = Router();

router.get("/honeys", getAll);

export default router;