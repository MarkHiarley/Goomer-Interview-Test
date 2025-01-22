import { Router, Request, Response } from 'express';
import pool from '../database/pgconnect';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const restaurantes = await pool.query('SELECT * FROM restaurantes');
        res.json(restaurantes.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao conectar ao banco de dados');
    }
});

router.post('/', async (req: Request, res: Response) => {
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

router.delete('/:id', async (req: Request, res: Response) => {
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

router.patch('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const { foto, nome, endereco } = req.body
        const camposDB = []
        const ValoresCampo = []
        if (!id) {
            return res.status(404).json("informe um id valido")
        }
        let query = "UPDATE restaurantes SET"
        if (foto) {
            camposDB.push("foto")
            ValoresCampo.push(foto)
        }
        if (nome) {
            camposDB.push("nome")
            ValoresCampo.push(nome)
        }

        if (endereco) {
            camposDB.push("endereco")
            ValoresCampo.push(endereco)
        }
        if (camposDB.length === 0) {
            return res.status(400).send("Nenhum campo para atualizar");
        }
        camposDB.forEach((campo, index) => {
            query += `${" " + campo} = $${index + 1}`; 
            if (index < camposDB.length - 1) {
                query += ', '
            }
        })

        query += ` WHERE id = $${camposDB.length + 1}` 
        ValoresCampo.push(id)
        await pool.query(query, ValoresCampo)
        res.status(200).json(`Restaurante ${id} atualizado com sucesso`);
    } catch (error) {
        console.error('Erro ao atualizar restaurante:', error);
        res.status(400).send("Erro ao atualizar restaurante");
    }
});


export default router;