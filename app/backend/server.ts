import express from 'express';
import router from '../backend/routes/index';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors({
    origin:'URL',
    methods:['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders:['Content-Type', 'Authorization']
}))
app.use('/api', router);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});