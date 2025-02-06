import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRET_KEY
import { Request, Response, NextFunction } from 'express';


export async function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
        if (!secretKey) {
            throw new Error('SECRET_KEY não está definida nas variáveis de ambiente');
        }
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const token = authHeader.replace("Bearer ", '');
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        const decoded = jwt.verify(token, secretKey)
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}


export default verifyAccessToken;