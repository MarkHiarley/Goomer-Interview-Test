import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY; 
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido ou inválido" });
    }

    if (!secretKey) {
      throw new Error("SECRET_KEY não está definida nas variáveis de ambiente");
    }

    const token = authHeader.split(" ")[1];

    
    const tokenDecoded = jwt.verify(token, secretKey);

    return res.status(200).json({ message: "Token válido", payload: tokenDecoded });
  } catch (error) {
    return res.status(500).json({ message: "Erro na verificação do token", error});
  }
});

export default router;
