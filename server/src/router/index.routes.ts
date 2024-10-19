import { Router } from 'express';
import honeyRoutes from './honey.routes';
import signRoutes from './sign.routes';

const router = Router();

router.use("/sign", signRoutes);
router.use("/honey", honeyRoutes);

export default router;