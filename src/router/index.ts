import { Router } from 'express';
import restaurantesRouter from './restaurantes';

const router = Router();

router.use('/restaurante', restaurantesRouter);

export default router;