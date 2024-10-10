import { Router } from 'express';
import { checkToken, 
        userSignIn,
        createUserAccount } from '../controller/user';
        
const router = Router();

router.get("/check-token", checkToken);
router.post("/signin", userSignIn);
router.post("/signup", createUserAccount);

export default router;