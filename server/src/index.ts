import express from 'express';
import cors from 'cors';
import { configCors } from './config/cors/configCors';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors(configCors));

const port = process.env.CONFIG_SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
