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
    try {
        const { produto_id, descricao, preco_promocional, dia_da_semana, hora_inicio, hora_fim } = req.body;

        const newPromocao = await pool.query(
            'INSERT INTO promocoes_produtos (produto_id, descricao, preco_promocional, dia_da_semana, hora_inicio, hora_fim) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [parseInt(produto_id), descricao, parseFloat(preco_promocional), dia_da_semana, hora_inicio, hora_fim]
        );
        res.status(201).json(newPromocao.rows[0]);

    } catch (erro) {
        res.status(500).json("erro ao conectar ao banco de dados, ")
        console.log(erro)
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        const promocoes_produtos = await pool.query('SELECT * FROM promocoes_produtos;')
        res.status(200).json(promocoes_produtos.rows)
    } catch (error) {
        res.status(500).json("erro ao conectar ao banco de dados, ")
        console.log(error)
    }
})
router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        await pool.query(`DELETE FROM promocoes_produtos WHERE id = ${parseInt(id)}`)
        res.status(200).json(`promocao com o id = ${id} deletado`)
    } catch (error) {
        res.status(500).json("erro ao conectar ao banco de dados" + error)
        console.log(error)
    }
})

router.patch('/:id', async (req: Request, res: Response) => {
    try {
        const { produto_id, descricao, preco_promocional, dia_da_semana, hora_inicio, hora_fim } = req.body
        const id = parseInt(req.params.id)
        const values = [];
        const fields = [];
        let query = 'UPDATE promocoes_produtos SET ';

        if (descricao) {
            values.push(descricao)
            fields.push('descricao')
        }
        if (preco_promocional) {
            values.push(preco_promocional)
            fields.push('preco_promocional')
        }
        if (dia_da_semana) {
            values.push(dia_da_semana)
            fields.push('dia_da_semana')
        }
        if (hora_inicio) {
            values.push(hora_inicio)
            fields.push('hora_inicio')
        }
        if (hora_fim) {
            values.push(hora_fim)
            fields.push('hora_fim')
        }
        if (produto_id) {
            values.push(produto_id)
            fields.push('produto_id')
        }
        fields.forEach((campo, index) => {
            query += `${campo} = $${index + 1}`;
            if (index < fields.length - 1) {
                query += ', ';
            }
        })
        query += ` WHERE id = $${fields.length + 1}`
        values.push(id)
        console.log(query)
        await pool.query(query, values);
        res.status(200).json(`promoções com o id:${id} atualizado`)

    } catch (error) {
        res.status(500).json('erro ao fazer a REQ' + error)
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        await pool.query(`DELETE promocoes_produtos WHERE id = ${id}`)
        res.status(200).json(`Promoção com o ID: ${id}, Deletada`)
    } catch (error) {
        res.status(500).json('erro em conexao com o servidor')
        console.log(error)
    }
})
export default router;