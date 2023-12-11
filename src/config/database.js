import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { databaseConectionError } from '../errors/database-connection-error.js';

dotenv.config();
const mongoClient = new MongoClient(process.env.DATABASE_URL);

export async function connectDb() {
  const result =  await mongoClient.connect();
  if (result) {
    console.log('Conexão com o banco de dados realizada com sucesso!');
    return;
  }
  throw databaseConectionError();
}

export const db = mongoClient.db();
