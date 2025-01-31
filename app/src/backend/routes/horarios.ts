import { Router, Request, Response } from 'express';
import pool from '../database/pgconnect';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try{
    const horarios = pool.query('SELECT * FROM horarios_restaurante')
    res.status(200).json((await horarios).rows[0])
    }catch(error){
        res.status(500).json("erro ao buscar horarios" + error)
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const { dia_da_semana, hora_inicio, hora_fim, restaurante_id } = req.body
        if (!restaurante_id || !dia_da_semana || !hora_inicio || !hora_fim) {
            return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
        }
        const restauranteIdInt = parseInt(restaurante_id);
        if (isNaN(restauranteIdInt)) {
            return res.status(400).json({ message: 'ID do restaurante inválido. Deve ser um número inteiro.' });
        }
        const newHorario = await pool.query(
            'INSERT INTO horarios_restaurante (restaurante_id, dia_da_semana, hora_inicio, hora_fim) VALUES ($1, $2, $3, $4) RETURNING *',
            [restauranteIdInt, dia_da_semana, hora_inicio, hora_fim]
        );

        res.status(201).json(newHorario.rows[0]);
    } catch (error) {
        console.error('Erro ao criar horário:', error);
        res.status(500).json({ message: 'Erro interno ao criar horário.' });
    }
});

export default router;