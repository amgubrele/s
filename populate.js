//to add products.json to database

require('dotenv').config()

const connectDB=require('./db/connect');
const Product=require('./models/products');


const jsonProducts=require('./products.json')


const start=async()=>{
    try {
        await connectDB(process.env.mongoURI)
        await Product.deleteMany();//delete all data from database
        await Product.create(jsonProducts)
        console.log('success!!!')
        process.exit(0);
    } catch (error) {
        console.log(error)
    }
}

start()
