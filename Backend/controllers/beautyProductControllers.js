const beautyProductModel=require('../models/beauty_product');
const beautyCategoryModel=require('../models/beauty_category');

const fs= require('fs');
const path=require('path');

exports.displayBeautyProduct=async(req,resp)=>{
    try{

        // 1. method
        const beauty_product=await beautyProductModel.find().populate('beauty_category_id','beauty_category_name');

        const all_products=beauty_product.map(products=>({
            _id:products._id,
            product_name:products.beauty_product_name,
            beauty_category_name:products.beauty_category_id.beauty_category_name
        }))

        resp.status(200).send(all_products);


    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertBeautyProduct=async(req,resp)=>{
    try{
        const beauty_product=req.body;
        const image_name=req.file.filename
        const beauty_name=await beautyCategoryModel.findOne({beauty_category_name:beauty_product.beauty_category_name});
        // console.log(cat_name);
        if(!beauty_name)
        {
            resp.status(400).send({message:"Invalid category name"});
            return ;
        }
        

        const newbeauty_product=new beautyProductModel({
            beauty_product_name:beauty_product.product_name,
            beauty_image:beauty_name,
            beauty_category_id:beauty_name._id
        })

        result= await newbeauty_product.save();
        resp.status(200).send(result);
}catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

// update product name
exports.updateBeautyProduct=async (req,resp)=>{
    try{
        const beauty_product_name=req.body;
        const beauty_product_id=req.params.id;

        const beauty_product= await beautyProductModel.findOne({_id:beauty_product_id});

        if(!beauty_product)
        {
            return resp.status(400).send({message:"Beauty Product not found"});
        }

        beautyProductModel.updateOne({_id:beauty_product_id},{
            $set:{
                beauty_product_name:well_product_name.product_name
            }
        },(err,well_product_update)=>{
            resp.status(500).send(well_product_update);
        })

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

// also delete child record
exports.deleteBeautyProduct=async(req,resp)=>{
    try{
        const well_product_id=req.params.id;
        const well_product_name=await beautyProductModel.findOne({_id:well_product_id});
        // fs.unlinkSync(well_product_image);

        if(well_product_name==null)
        {
            return resp.status(400).send({message:"beauty Product not found"});
        }
        const well_product_image=well_product_name.beauty_image;
        const i_path=path.join(__dirname,'../','uploads','beauty_product',well_product_image);
        console.log(i_path);
        fs.unlink(i_path,(err)=>{
            if(err)
            {
                return resp.status(400).send({message:err});
            }
        });
        const well_product=await beautyProductModel.deleteOne({_id:well_product_id});
        // if(well_product.deletedCount==0)
        // {
        //     return resp.status(400).send({message:"beauty Product not found"});
        // }
        // console.log(well_product_name.beauty_product_name);
        resp.status(200).send({message:`${well_product_name.beauty_product_name} was deleted`});

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchBeautyProduct=async(req,resp)=>{
    try{

        // 1. method

        const well_product=await beautyProductModel.find({beauty_product_name:req.params.pname}).populate('beauty_category_id','beauty_category_name');

        const all_products=well_product.map(products=>({
            _id:products._id,
            product_name:products.beauty_product_name,
            beauty_category_name:products.beauty_category_id.beauty_category_name
        }))

        resp.status(200).send(all_products);



    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}


