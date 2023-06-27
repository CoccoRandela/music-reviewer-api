import express from 'express';
import routes from './routes';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors());
app.use('/api', routes.users);
app.get('/', (req, res) => {
	res.send('Hello World!');
});
app.listen(process.env.PORT, () => console.log('listening!'));
