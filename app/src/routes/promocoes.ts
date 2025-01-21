import { Router, Request, Response } from 'express';
import pool from '../database/pgconnect';

const router = Router();

//id
//produto_id
//descricao
//preco_promocional
//dia_da_semana
//hora_inicio
//hora_fim

router.post('/', async (req: Request, res: Response) => {
    try{
    const { produto_id, descricao, preco_promocional, dia_da_semana, hora_inicio, hora_fim } = req.body;

    const newPromocao = await pool.query(
        'INSERT INTO promocoes_produtos (produto_id, descricao, preco_promocional, dia_da_semana, hora_inicio, hora_fim) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [parseInt(produto_id), descricao, parseFloat(preco_promocional), dia_da_semana, hora_inicio, hora_fim]
    );
    res.status(201).json(newPromocao.rows[0]);
  
    }catch(erro){
    res.status(500).json("erro ao conectar ao banco de dados, ")     
    }
})

export default router;