import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5999;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  const birthdate="My birthdate is " +new Date('11/05/1992').toDateString()
  res.send(`<h1>${birthdate}</h1>`)
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
