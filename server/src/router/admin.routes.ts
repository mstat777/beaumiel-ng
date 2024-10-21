import { Router } from 'express';
import { getAllUsers } from '../controller/admin';
        
const router = Router();

router.get("/users/all", getAllUsers);

export default router;