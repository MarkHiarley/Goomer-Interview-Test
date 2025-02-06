import jwt from 'jsonwebtoken'
const secretKeyRefresh = process.env.SECRET_KEY_REFRESH

export async function refreshToken(gmail:string, password:string) {
    try {
        if (!secretKeyRefresh) {
            throw new Error('SECRET_KEY não está definida nas variáveis de ambiente');
        }
        const token = jwt.sign(
            {
                gmail,
                password
            },
            `${secretKeyRefresh}`,
            {
                expiresIn: '1d'
            }
        )
        return token
    } catch (error) {

    }
}

export default refreshToken;