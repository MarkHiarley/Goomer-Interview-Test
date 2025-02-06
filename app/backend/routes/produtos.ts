import { Router, Request, Response } from 'express';
import pool from '../database/db';
import verifyToken from '../middleware/verify.AccessToken';

const router = Router();

router.post('/', verifyToken, async (req: Request, res: Response) => {
    const { nome, categoria, preco, restaurante_id, foto } = req.body;
    try {

        if (!nome || !categoria || !preco || !restaurante_id || !foto) {
            res.status(400).send('Por favor, preencha todos os campos');
        }

        const newProduto = await pool.query('INSERT INTO produtos (restaurante_id,nome,foto, preco,  categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *', [parseInt(restaurante_id), nome, foto, parseFloat(preco), categoria]);
        res.status(201).json(newProduto.rows[0]);
        console.log('Produto adicionado com sucesso' + newProduto.rows[0]);

    } catch (erro: any) {
        console.log(erro);
        res.status(500).send('Erro ao adicionar produto');
    }
});

router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const Produtos = await pool.query('SELECT * FROM produtos')
        if (Produtos === null) {
            return res.status(200).json('Não há produtos para buscar')
        }
        res.status(200).json(Produtos.rows)
    } catch (error: any) {
        res.status(500).json("erro ao buscar" + error)
    }
})

router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (!id) {
        return res.status(404).json('Id invalido ou inexistente')
    }
    try {
        const produtoDelete = await pool.query('DELETE FROM produtos WHERE id = $1', [id])
        res.status(200).json(`produto com id: ${id} deletado com sucesso` + produtoDelete)
    } catch (error: any) {
        res.status(500).json("erro ao deletar" + error)
    }
})

router.patch('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const { nome, categoria, foto } = req.body

        const restaurante_id = req.body.restaurante_id !== undefined ? req.body.restaurante_id : null;
        const preco = req.body.preco !== undefined ? parseFloat(req.body.preco) : null;

        const validPreco = preco !== null && !isNaN(preco) ? preco : null;
        const validRestauranteId = restaurante_id !== null && !isNaN(restaurante_id) ? restaurante_id : null;


        const ObjectData = { restaurante_id: validRestauranteId, nome, categoria, foto, preco: validPreco };

        let query = 'UPDATE produtos SET '
        const values: any[] = [];
        const fields: string[] = [];




        Object.entries(ObjectData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                fields.push(`${key} = $${fields.length + 1}`)
                values.push(value)
            }
        })
        query += fields.join(', ')
        query += ` WHERE id = $${fields.length + 1}`
        values.push(id)

        console.log(query, values)

        await pool.query(query, values)
        res.status(201).json(`produto com o id:${id} atualizado com sucesso`)
    } catch (erro: any) {
        res.status(500).json(erro + "erro ao conectar o banco de dados ou api")
        console.log(erro)
    }
})
export default router;