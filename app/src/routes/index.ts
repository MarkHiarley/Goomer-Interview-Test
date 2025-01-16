import { Router } from 'express';
import restaurantesRouter from './restaurantes';
import produtosRouter from './produtos';

const router = Router();

router.use('/restaurante', restaurantesRouter);
router.use('/produto', produtosRouter);


export default router;