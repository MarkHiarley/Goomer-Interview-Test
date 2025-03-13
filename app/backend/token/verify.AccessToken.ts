import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = process.env.SECRET_KEY;
declare module 'express-serve-static-core' {
    interface Request {
        user?: any; 
    }
}

export async function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
        if (!secretKey) {
            throw new Error('SECRET_KEY não está definida nas variáveis de ambiente');
        }
        const authCookies = req.cookies.cookieTest;
        if (!authCookies) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const token = authCookies.replace("Bearer ", '');
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}

export default verifyAccessToken;