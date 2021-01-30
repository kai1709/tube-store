import express from 'express';
import config from './config'
import mongoose from 'mongoose'
import { connectDatabase } from './database'
import User from './models/User'
import * as UserControllers from './controllers/User'
import bodyParser from 'body-parser'

const app = express();

connectDatabase();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req: express.Request, res: express.Response) => res.send('API is running'));

app.post('/user/login', UserControllers.login)
app.get('/user/list', async (req: express.Request, res: express.Response) => {
  const users = await User.find({})
  res.status(200).json({
    message: 'success',
    data: users
  })
});

app.listen(config.PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${config.PORT}`);
});
