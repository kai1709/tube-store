import express from 'express';
import config from './config'
import mongoose from 'mongoose'
import { connectDatabase } from './database'
import User from './models/User'

const app = express();

connectDatabase();

app.get('/', (req: express.Request, res: express.Response) => res.send('API is running'));

app.get('/user', async (req: express.Request, res: express.Response) => {
  const users = await User.find({
    name: 'Son'
  })

  // const newUser = await User.create({
  //   name: 'Son',
  //   username: 'sontrinh',
  //   password: '123456'
  // })

  res.status(200).json({
    message: 'success',
    data: users
  })
});

app.listen(config.PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${config.PORT}`);
});
