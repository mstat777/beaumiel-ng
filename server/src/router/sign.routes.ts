import { Router } from 'express';
import { checkToken, 
        userSignIn,
        createUserAccount } from '../controller/sign';
import { validationRules, validateResult } from '../middlewares/validate';
        
const router = Router();

router.get("/check-token", checkToken);

router.post("/signin", 
            validationRules('signIn'),
            validateResult, 
            userSignIn);

router.post("/signup", 
            validationRules('createUser'),
            validateResult, 
            createUserAccount);

export default router;