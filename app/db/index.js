import mongoose from 'mongoose';
import { DB_URL } from '../config';
mongoose.connect(DB_URL, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

let connection = mongoose.connection;

connection.once('open', () => {
  console.log("Database is Connected")
}).catch(err => {
  console.log("Not Connected")
});

export default connection;