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

router.get('/', async (req: Request, res: Response) => {
    try {
        const Produtos = await pool.query('SELECT * FROM produtos')
        if(Produtos === null){
            return res.status(200).json('Não há produtos para buscar')
        }
        res.status(200).json(Produtos.rows)
    }catch(error){
        res.status(500).json("erro ao buscar" + error)
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if(!id){
        return res.status(404).json('Id invalido ou inexistente')
    }
    try {
        const produtoDelete = await pool.query('DELETE FROM produtos WHERE id = $1',[id])
        res.status(200).json(`produto com id: ${id} deletado com sucesso` + produtoDelete)
    }catch(error){
        res.status(500).json("erro ao deletar" + error)
    }
})
export default router;