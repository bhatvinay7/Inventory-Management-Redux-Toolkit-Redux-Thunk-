import express from 'express';
import  mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();
import dotenv from 'dotenv';
import ItemRouter from './route/inventory.route.js';
dotenv.config();
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,               // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT','DELETE','PATCH', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type','Authorization'],     // Allowed headers
  optionsSuccessStatus: 204,        // For legacy browser support
  maxAge: 600                       // Cache preflight response for 10 minutes
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api',ItemRouter);
mongoose.connect(`mongodb+srv://${process.env.REACT_KEY_VALUE}@cluster0.lkgwr.mongodb.net/${process.env.REACT_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
   
//    mongodb+srv://${process.env.REACT_KEY_VALUE}@cluster0.lkgwr.mongodb.net/${process.env.REACT_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0
    
    app.listen(3006, () => {
      console.log('Connected successfully.');
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
