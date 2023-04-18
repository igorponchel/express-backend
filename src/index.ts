import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import path from 'path';
import { stuffRouter } from './routes/stuff.routes';
import { UnknownRoutesHandler } from './middlewares/unknown-routes.handler';
import { ExceptionsHandler } from './middlewares/exception.handler';
import { userRouter } from './routes/user.routes';
import { AuthHandler } from './middlewares/auth.handler';

mongoose.connect('mongodb+srv://igouz:6mlsbG0LbxLvyxuv@cluster0.sqqorfn.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use('/api/stuff', AuthHandler, stuffRouter);
app.use('/api/auth', userRouter);
app.all('*', UnknownRoutesHandler);
app.use(ExceptionsHandler);

app.listen(3000, () => console.log('Silence, ça tourne.'))