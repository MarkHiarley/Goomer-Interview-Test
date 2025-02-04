import { Router } from 'express';
import restaurantesRouter from './restaurantes';
import produtosRouter from './produtos';
import promocoesRouter from './promocoes';
import horariosRouter from './horarios';
import loginAPI from './login/login'

const router = Router();


router.use('/restaurantes', restaurantesRouter);
router.use('/produtos', produtosRouter);
router.use('/promocoes', promocoesRouter);
router.use('/horarios', horariosRouter);
router.use('/login', loginAPI);


export default router;