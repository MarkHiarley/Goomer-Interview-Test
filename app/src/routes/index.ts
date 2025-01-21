import { Router } from 'express';
import restaurantesRouter from './restaurantes';
import produtosRouter from './produtos';
import promocoesRouter from './promocoes';

const router = Router();

router.use('/restaurantes', restaurantesRouter);
router.use('/produtos', produtosRouter);
router.use('/promocoes', promocoesRouter);


export default router;