import express, { json } from 'express';
import { routes } from './routes';
import 'dotenv/config';
import { setupMongo } from './database';

setupMongo().then(() => {
	const app = express();

	app.use(json());
	app.use(routes);

	app.listen(3333, () => console.log('🚀 App is running at port 3333'));
});
