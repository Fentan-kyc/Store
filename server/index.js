import dotenv from 'dotenv/config';
import express from "express";

import sequelize from './bd.js';
import cors from 'cors';
import * as models from './models/models.js';
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);


app.use(errorHandler); // ever last

const startDb = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => { console.log(`Server started on ${PORT} port`)})
    }
    catch(e){
        console.log(e)
    }
}

startDb()