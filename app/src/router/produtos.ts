import { Router, Request, Response } from 'express';
import pool from '../database/pgconnect';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { nome, categoria, preco, restaurante_id, foto } = req.body;
    try {

        if (!nome || !categoria || !preco || !restaurante_id || !foto) {
            res.status(400).send('Por favor, preencha todos os campos');
        }

        const newProduto = await pool.query('INSERT INTO produtos (restaurante_id,nome,foto, preco,  categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *', [parseInt(restaurante_id), nome, foto, parseFloat(preco), categoria]);
        res.status(201).json(newProduto.rows[0]);
        console.log('Produto adicionado com sucesso' + newProduto.rows[0]);

    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao adicionar produto');
    }
});
export default router;