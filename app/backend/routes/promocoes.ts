import { Router, Request, Response } from 'express';
import pool from '../database/db';
import verifyToken from '../token/verify.AccessToken';

const router = Router();

//id
//produto_id
//descricao
//preco_promocional
//dia_da_semana
//hora_inicio
//hora_fim

router.post('/', verifyToken, async (req: Request, res: Response) => {
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

router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const promocoes_produtos = await pool.query('SELECT * FROM promocoes_produtos;')
        res.status(200).json(promocoes_produtos.rows)
    } catch (error) {
        res.status(500).json("erro ao conectar ao banco de dados, ")
        console.log(error)
    }
})


router.patch('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const { produto_id, descricao, preco_promocional, dia_da_semana, hora_inicio, hora_fim } = req.body
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).send("Por favor, informe um ID válido");
        }

        const values: any[] = [];
        const fields: string[] = [];
        let query = 'UPDATE promocoes_produtos SET ';

        const ObjectData = { produto_id, descricao, preco_promocional, dia_da_semana, hora_inicio, hora_fim }
        /*construo meu obejeto com as informacoes*/

        Object.entries(ObjectData).forEach(([key, value]) => {
            /*aqui eu uso o obeject entries para separa o meu objeto em pares tipo:
            [
                [produto_id, "valor que vem sa REQ"       
            ]         
            */
            if (value !== undefined) {
                /*eu faco a verificacao */
                fields.push(`${key} = $${fields.length + 1}`);
                /*envio os campos com as seguinte $mais o index deles tambem pra um array*/
                values.push(value)
            }
        })

        query += fields.join(', ')
        /*aqui eu separo os campo com virgula */
        query += ` WHERE id = $${fields.length + 1}`
        /*falo que o id é tamanho da lista mais um que reprensenta id, que logo em seguida eu envio o id para os valores */
        values.push(id)


        await pool.query(query, values);
        res.status(200).json(`promoções com o id:${id} atualizado`)
        console.log("deu certo porra " + query + "," + values)

    } catch (error) {
        res.status(500).json('erro ao fazer a REQ' + error)
    }
})

router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
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