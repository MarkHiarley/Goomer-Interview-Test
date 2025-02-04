import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRET_KEY
if (!secretKey) {
    throw new Error('SECRET_KEY não está definida nas variáveis de ambiente');
}
export function createToken(gmail:string, password:string){
   
    const token = jwt.sign(
        {
            gmail,
            password
        },
        `${secretKey}`,
        {
            expiresIn:'2h'
        }
    )
    return token
}

export default createToken;
