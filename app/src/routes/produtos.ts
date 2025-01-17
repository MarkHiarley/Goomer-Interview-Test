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

    } catch (erro : any) {
        console.log(erro);
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
    }catch(error: any){
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
    }catch(error: any){
        res.status(500).json("erro ao deletar" + error)
    }
})

router.put('/:id' , async (req: Request, res:Response)=> {
    const { nome, categoria, foto } = req.body
    const restaurante_id = parseInt(req.body.restaurante_id)
    const id = parseInt(req.params.id)
    const preco = parseFloat(req.body.preco)
    try{
        if(!nome || !categoria || !restaurante_id || !preco || !foto){
            return res.status(404).json("informe todo os valores")
        }
        const produtoAtualizado = await pool.query(
            'UPDATE produtos SET restaurante_id= $1, nome = $2, foto = $3, preco = $4, categoria = $5 WHERE id = $6',
            [restaurante_id, nome, foto, preco, categoria, id ]
        );
        res.status(201).json(`produto com o id:${id} atualizado com sucesso` + produtoAtualizado)
    }catch(erro:any){
        res.status(500).json(erro+"erro ao conectar o banco de dados ou api")
        console.log(erro)
    }
})
export default router;