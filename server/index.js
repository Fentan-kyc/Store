import dotenv from 'dotenv/config';
import express from "express";

import sequelize from './bd.js';
import models from './models/models.js'

const PORT = process.env.PORT || 5000;

const app = express()

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