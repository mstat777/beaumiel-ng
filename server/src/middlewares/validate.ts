import { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';

export const validationRules: any = (method: string) => {
    switch (method) {
        case 'createUser': {
            return [
                body('firstName').exists().matches(
                    /^[a-zàâçéèêëîïôûùüÿñæœ .'-]*$/i
                ),
                body('lastName').exists().matches(
                    /^[a-zàâçéèêëîïôûùüÿñæœ .'-]*$/i
                ),
                body('email').exists().isEmail().matches(
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                ),
                body('password').exists().escape().matches(
                    /[a-zA-Z\d]/
                )
            ]
        }
        case 'signIn': {
            return [
                body('email').exists().isEmail().matches(
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                ),
                body('password').exists().escape().matches(
                    /[a-zA-Z\d]/
                )
            ]
        }
        case 'subscribeNewsletter': {
            return [
                body('email').exists().isEmail().matches(
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                )
            ];
        }
        case 'sendMail': {
            return [
                body('name').exists().matches(
                    /^[a-zàâçéèêëîïôûùüÿñæœ .'-]*$/i
                ),
                body('email').exists().isEmail().matches(
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                ),
                body('message').exists().escape().isLength({ min: 2, max: 600 })
            ];
        };
        case 'payment': {
            return [
                body('amount').exists().isInt({ min: 50, max: 100000000}),
                body('currency').exists().matches(/^[a-zA-Z]{3}$/)
            ];
        }
        default: return null;
    }
}

export const validateResult: any = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    } else {
        next();
    }
}