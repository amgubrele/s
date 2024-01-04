require('dotenv').config()
const express=require('express');
const connectDB = require('./db/connect');
const app=express();

const errorMiddleware=require('./Middlewares/error-handlers');
const notFound=require('./Middlewares/not-found')
const productsRouter=require('./routes/products')
require('express-async-errors')


//middleware
app.use(express.json());



//routes

app.get('/',(req,res)=>{
    res.send('<h1>working correct</h1>')
})
app.use('/api/v1/products',productsRouter)


//error handlers middlewares
app.use(notFound);
app.use(errorMiddleware);

//staring the app

const port=process.env.PORT || 5000;

const start=async()=>{
    try {
        await connectDB(process.env.mongoURI)
        app.listen(port,console.log(`app is listening on port ${port}....`))
    } catch (error) {
        console.log(error);
    }
}
start();