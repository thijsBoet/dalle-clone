import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
	res.send('Hello From DALL-E!');
});

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(process.env.PORT, () =>
			console.log(
				`Server is running on https://dalle-ejcv.onrender.com:${process.env.PORT}`
			)
		);
	} catch (error) {
		console.log(error);
	}
};

startServer();
