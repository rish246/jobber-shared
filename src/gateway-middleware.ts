import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "./error-handler";

const tokens = [
    'auth',
    'buyer',
    'seller',
    'gig',
    'order',
    'search',
    'chat',
    'email',
    'review',
];


export async function validateGateway(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.gatewayToken as string;
    if (!token) {
        throw new UnauthorizedError('Unauthorized', 'validateGateway(): Invalid Request');
    }
    const payload: {id: string, iat: number} = jwt.verify(token, process.env.JWT_SECRET || '') as {id: string, iat: number};
    if (!tokens.includes(payload.id)) {
        throw new UnauthorizedError('Unauthorized', 'validateGateway(): Invalid Token');
    }
    next();
}