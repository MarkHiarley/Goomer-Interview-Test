import { Router, Request, Response } from 'express';

import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRET_KEY
const router = Router();

router.post('/', async (res: Response, req: Request) => {
    try {
        const authHeaders = req.headers.authorization
        if (!authHeaders) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        if (!secretKey) {
            throw new Error('SECRET_KEY não está definida nas variáveis de ambiente');
        }
        const token = authHeaders.replace("Bearer ", '')
        const tokenDecoded = jwt.verify(token, secretKey)

        if(token !== tokenDecoded){
            return res.status(403).json('deuruim')
        }
        return res.status(200).json('deubom')
    } catch (error) {
        res.status(500).json({error})
    }
})





export default router