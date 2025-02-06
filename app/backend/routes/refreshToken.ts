import express from 'express';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import createToken from '../middleware/create.AccessToken';
import cookiesParser from 'cookie-parser';

const router = express.Router();
const secretKeyRefresh = process.env.SECRET_KEY_REFRESH;
router.use(cookiesParser())
router.post('/',(req:Request, res:Response)=>{
    try {
        const refreshToken = req.cookies.cookieNAME

        if(!refreshToken){
            return res.status(404).json("Refresh token nao foi encontrado")
        }
        if (!secretKeyRefresh) {
            throw new Error('SECRET_KEY_REFRESH não está definida nas variáveis de ambiente');
        }
        const decoded = jwt.verify(refreshToken, secretKeyRefresh) as {gmail:string, password:string}

        const newAccessToken = createToken(decoded.gmail, decoded.password)

        res.status(201).json({accessToken:newAccessToken})
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Refresh token inválido ou expirado' });
        
    }
})



export default router;