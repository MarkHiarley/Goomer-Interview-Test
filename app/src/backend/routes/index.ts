import { Router } from 'express';
import restaurantesRouter from './restaurantes';
import produtosRouter from './produtos';
import promocoesRouter from './promocoes';
import horariosRouter from './horarios';

const router = Router();

router.use('/restaurantes', restaurantesRouter);
router.use('/produtos', produtosRouter);
router.use('/promocoes', promocoesRouter);
router.use('/horarios', horariosRouter);


export default router;