import express from 'express';
import router from '../backend/routes/index';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders:['Content-Type', 'Authorization'],
    credentials: true,
}))
app.use(cookieParser())
app.use('/api', router);
    
const port = 3001;  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});