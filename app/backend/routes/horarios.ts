import { Router, Request, Response } from 'express';
import pool from '../database/db';
import verifyToken from '../middleware/verify.AccessToken';

const router = Router();

router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const horarios = pool.query('SELECT * FROM horarios_restaurante')
        res.status(200).json((await horarios).rows[0])
    } catch (error) {
        res.status(500).json("erro ao buscar horarios" + error)
    }
})

router.post('/', verifyToken, async (req: Request, res: Response) => {
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

router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json('Informe um id valido')
        }
        await pool.query(`DELETE FROM horarios_restaurante WHERE id = ${id}`)
        res.status(200).json(`Produto com id ${parseInt(id)} DELETADO`)
    } catch (error) {
        res.status(500).json('erro ao deletar o produto')
        console.log(error)
    }
})

router.patch('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const { dia_da_semana, hora_inicio, hora_fim, restaurante_id } = req.body
        const id = req.params.id
        const validRestauranteId = restaurante_id !== null && !isNaN(restaurante_id) ? restaurante_id : null
        let query = 'UPDATE horarios_restaurante SET '
        const values: any[] = [];
        const fields: string[] = [];
        const data = { dia_da_semana, hora_inicio, hora_fim, restaurante_id: validRestauranteId, }

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                fields.push(`${key} = $${fields.length + 1}`)
                values.push(value)
            }
        })
        query += fields.join(', ')
        query += ` WHERE id = $${fields.length + 1}`
        values.push(id)

        await pool.query(query, values)
        res.status(201).json(`Horario com o id:${id} atualizado com sucesso`)
    } catch (error) {
        res.status(500).json(error + "erro ao conectar o banco de dados ou api")
        console.log(error)
    }

})
export default router;