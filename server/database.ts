import config from './config'
import mongoose from 'mongoose'

const mongooseOption = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

export const connectDatabase = () => {
  const MONGO_URL = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_URL}/${config.DB_NAME}?retryWrites=true&w=majority`
  mongoose.connect(MONGO_URL, mongooseOption)
}
