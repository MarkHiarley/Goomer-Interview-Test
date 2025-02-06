import { Router, Request, Response } from 'express';
import pool from '../database/db';
import verifyToken from '../middleware/verify.AccessToken';
const router = Router();

router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const restaurantes = await pool.query('SELECT * FROM restaurantes');
        res.json(restaurantes.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao conectar ao banco de dados');
    }
});

router.post('/', verifyToken, async (req: Request, res: Response) => {
    const { foto, nome, endereco } = req.body;
    try {
        const newRestaurante = await pool.query(
            'INSERT INTO restaurantes (foto, nome, endereco) VALUES ($1, $2, $3) RETURNING *',
            [foto, nome, endereco]
        );
        res.status(201).json(newRestaurante.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao inserir no banco de dados');
    }
});

router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).send("Por favor, informe o ID do restaurante");
        }
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM restaurantes WHERE id = $1', [id]);
        res.status(200).json(`Restaurante ${id} deletado com sucesso`);
    } catch (error) {
        res.status(400).send("Erro ao deletar restaurante");
    }
});

router.patch('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const { foto, nome, endereco } = req.body
        const values: any[] = [];
        const fields: string[] = [];

        let query = "UPDATE restaurantes SET "

        const ObjectData = { foto, nome, endereco }

        Object.entries(ObjectData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                fields.push(`${key} = $${fields.length + 1}`)
                values.push(value)
            }
        })
        query += fields.join(', ')
        query += ` WHERE id = $${fields.length + 1}`
        values.push(id)
        console.log(query)
        await pool.query(query, values)
        res.status(200).json(`Restaurante ${id} atualizado com sucesso`);
    } catch (error) {
        console.error('Erro ao atualizar restaurante:', error);
        res.status(400).send("Erro ao atualizar restaurante");
    }
});


export default router;