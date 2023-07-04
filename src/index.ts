import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import 'dotenv/config';
import cors from 'cors';
const app = express();

const main = async () => {
	await mongoose.connect(`${process.env.DB}`);
};
main().catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use('/api', routes.users);
app.get('/', (req, res) => {
	res.send('Hello World!');
});
app.listen(process.env.PORT, () => console.log('listening!'));
