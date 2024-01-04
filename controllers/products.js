
const Product=require('../models/products')

const { error } = require("console")

const getAllProductsStatic=async(req,res)=>{

    const products=await Product.find({}).select('name price')
    res.status(670).json({products,size:products.length})
}

const getAllProducts=async (req,res)=>{
    const {featured,company,name,sort,fields}=req.query;

    const queryObject={}

    if(featured){
        queryObject.featured=featured=='true'?true:false;
    }
    if(company){
        queryObject.company={$regex:company,$options:'i'};  //i is for case insensetive
    }
    if(name){
        queryObject.name={$regex:name,$options:'i'};
    }

    let result= Product.find(queryObject);

    if(sort){
        console.log(sort)
        const sortList=sort.split(',').join(' ');
        // console.log(sortList)
        result=result.sort(sortList)
        }
    else{
        result=result.sort('createdAt');
    }

    if(fields){          //what fields you want for each product
        const fieldsList=fields.split(',').join(' ');
        result=result.select(fieldsList)
    }
    
    const page=Number(req.query.page)||1;
    const limit=Number(req.query.limit)||10;
    const skip=(page-1)*limit;

    result=result.skip(skip).limit(limit)
    const products=await result
    res.status(200).json({products,size:products.length} )
} 

module.exports={
    getAllProducts,
    getAllProductsStatic,
}