import express from 'express';
import { Request, Response } from 'express';
import pool from '../DB/pgconnect';


const app = express();
app.use(express.json());    

app.get('/restaurante', async(req:Request, res:Response) => {
    const restaurantes = await pool.query('SELECT * FROM restaurantes');
    res.json(restaurantes.rows);
});

app.post('/restaurante' ,async(req:Request, res:Response) => {
    const {fotoURl, nome, enderecoRestaurante} = req.body;
    const newRestaurante = await pool.query('INSERT INTO restaurantes (foto, nome, endereco) VALUES ($1, $2, $3) RETURNING *', [fotoURl, nome, enderecoRestaurante]);
    res.status(201).json(newRestaurante.rows);
},) 





const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});