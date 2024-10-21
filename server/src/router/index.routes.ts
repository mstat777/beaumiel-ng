import { Router } from 'express';
import honeyRoutes from './honey.routes';
import signRoutes from './sign.routes';
import adminRoutes from './admin.routes'
import { auth } from '../middlewares/auth';

const router = Router();

router.use("/honey", honeyRoutes);
router.use("/sign", signRoutes);

// protected routes:
router.use("/admin", auth, adminRoutes);

export default router;