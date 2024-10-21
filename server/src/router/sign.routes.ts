import { Router } from 'express';
import { checkToken, 
        userSignIn,
        createUserAccount } from '../controller/sign';
import { validationRules, validateResult } from '../middlewares/validate';
import { auth } from '../middlewares/auth';
        
const router = Router();

router.post("/check-token", auth, checkToken);

router.post("/signin", 
            validationRules('signIn'),
            validateResult, 
            userSignIn);

router.post("/signup", 
            validationRules('createUser'),
            validateResult, 
            createUserAccount);

export default router;