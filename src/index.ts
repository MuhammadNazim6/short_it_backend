import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import urlRoutes from './routes/urlRoutes';
import cors from 'cors';
import { connectToDatabase } from './db';

connectToDatabase()
const app = express();
const port = process.env.PORT || 3000

app.use(cors({
  origin: process.env.CORS_URL, 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", urlRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});