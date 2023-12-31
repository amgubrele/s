const express=require('express');
const connectDB = require('./db/connect');
const app=express();
require('dotenv').config()



const port=4000;

const start=async()=>{
    try {
        await connectDB(process.env.mongoURI)
        app.listen(port,console.log(`app is listening on port ${port}....`))
    } catch (error) {
        console.log(error);
    }
}
start();