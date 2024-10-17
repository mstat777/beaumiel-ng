import { Router } from 'express';
import honeyRoutes from './honey.routes';
import userRoutes from './user.routes';


const router = Router();

router.use("/user", userRoutes);
router.use("/honey", honeyRoutes);

export default router;