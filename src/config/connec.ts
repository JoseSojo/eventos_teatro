// getting-started.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const dot = dotenv.config()
main().catch(err => console.log(err));

// local: mongodb://127.0.0.1:27017/BaseApp
// remote: mongodb+srv://jsojo346:joseSojo2828@cluster0.lf4esux.mongodb.net/


async function main() {
  const mongoURI = `${process.env.MONGO}`;
  await mongoose.connect(mongoURI);
  console.log('MONDODB RUNNING');
}

export default main;
