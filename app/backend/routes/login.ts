import { Router, Request, Response } from 'express';
const router = Router();
import bcrypt from 'bcryptjs';
import createAccessToken from '../token/create.AccessToken';
import refreshToken from '../token/create.RefreshToken';

router.post('/', async (req: Request, res: Response) => {
    const { gmail, password } = req.body
    try {
        const user = {
            gmail: "teste",
            password: await bcrypt.hash("12345", 10)
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if (passwordValid === false) {
           return res.status(401).json({ message: 'Senha ou gmail inválidos' });
        }
        
        const token = createAccessToken(user.gmail, user.password)
        const refreshTokenCookies = refreshToken(user.gmail, user.password)
        res.cookie('cookieTest',
            token,  
            {
                httpOnly: true,
                secure: false
            })
        res.cookie('cookieRefresh',
            refreshTokenCookies,
            {
                httpOnly: true,
                secure: false
            })
            
        res.status(200).json('Login feito com sucesso')

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
})


export default router;