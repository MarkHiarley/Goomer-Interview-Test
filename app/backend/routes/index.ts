import { Router } from 'express';
import restaurantesRouter from './restaurantes';
import produtosRouter from './produtos';
import promocoesRouter from './promocoes';
import horariosRouter from './horarios';
import login from './login'
import refreshtoken from './refreshToken'

const router = Router();


router.use('/restaurantes', restaurantesRouter);
router.use('/produtos', produtosRouter);
router.use('/promocoes', promocoesRouter);
router.use('/horarios', horariosRouter);
router.use('/login', login);
router.use('/refreshTK', refreshtoken);


export default router;