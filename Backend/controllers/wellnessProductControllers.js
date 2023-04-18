const wellnessProductModel=require('../models/wellness_product');
const wellnessCategoryModel=require('../models/wellness_category');

const fs= require('fs');
const path=require('path');

exports.displayWellnessProduct=async(req,resp)=>{
    try{

        // 1. method
        const well_product=await wellnessProductModel.find().populate('wellness_category_id','wellness_category_name');

        const all_products=well_product.map(products=>({
            _id:products._id,
            product_name:products.wellness_product_name,
            wellness_category_name:products.wellness_category_id.wellness_category_name
        }))

        resp.status(200).send(all_products);


        // 2. second method

        // const well_product=await wellnessProductModel.find({});
        // if(well_product=="")
        // {
        //     return resp.status(400).send({message:"Wellness Product not found"});
        // }

        // const all_products=await wellnessProductModel.aggregate([
        //     {
        //         $lookup:{
        //             from:'wellness_categories',
        //             localField:'wellness_category_id',
        //             foreignField:'_id',
        //             as:'category'
        //         }
        //     },
        //     {
        //         $project:{
        //             _id:0,  // if 1 then show the id
        //             wellness_product_name:1,
        //             wellness_image:1,
        //             wellness_category_name:'$category.wellness_category_name'
        //         }
        //     }
        // ])

        // resp.status(200).send(all_products);

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertWellnessProduct=async(req,resp)=>{
    try{
        const well_product=req.body;
        const image_name=req.file.filename
        const cat_name=await wellnessCategoryModel.findOne({wellness_category_name:well_product.wellness_category_name});
        // console.log(cat_name);
        if(!cat_name)
        {
            resp.status(400).send({message:"Invalid category name"});
            return ;
        }
        

        const newwell_product=new wellnessProductModel({
            wellness_product_name:well_product.product_name,
            wellness_image:image_name,
            wellness_category_id:cat_name._id
        })

        result= await newwell_product.save();
        resp.status(200).send(result);
}catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

// update product name
exports.updateWellnessProduct=async (req,resp)=>{
    try{
        const well_product_name=req.body;
        const well_product_id=req.params.id;

        const well_product= await wellnessProductModel.findOne({_id:well_product_id});

        if(!well_product)
        {
            return resp.status(400).send({message:"Wellness Product not found"});
        }

        wellnessProductModel.updateOne({_id:well_product_id},{
            $set:{
                wellness_product_name:well_product_name.product_name
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
exports.deleteWellnessProduct=async(req,resp)=>{
    try{
        const well_product_id=req.params.id;
        const well_product_name=await wellnessProductModel.findOne({_id:well_product_id});
        // fs.unlinkSync(well_product_image);

        if(well_product_name==null)
        {
            return resp.status(400).send({message:"Wellness Product not found"});
        }
        const well_product_image=well_product_name.wellness_image;
        const i_path=path.join(__dirname,'../','uploads','wellness_product',well_product_image);
        console.log(i_path);
        fs.unlink(i_path,(err)=>{
            if(err)
            {
                return resp.status(400).send({message:err});
            }
        });
        const well_product=await wellnessProductModel.deleteOne({_id:well_product_id});
        // if(well_product.deletedCount==0)
        // {
        //     return resp.status(400).send({message:"Wellness Product not found"});
        // }
        // console.log(well_product_name.wellness_product_name);
        resp.status(200).send({message:`${well_product_name.wellness_product_name} was deleted`});

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchWellnessProduct=async(req,resp)=>{
    try{

        // 1. method

        const well_product=await wellnessProductModel.find({wellness_product_name:req.params.pname}).populate('wellness_category_id','wellness_category_name');

        const all_products=well_product.map(products=>({
            _id:products._id,
            product_name:products.wellness_product_name,
            wellness_category_name:products.wellness_category_id.wellness_category_name
        }))

        resp.status(200).send(all_products);


        // 2. method

        // const well_product_name=req.params.pname;
        // const well_product= await wellnessProductModel.find({wellness_product_name:well_product_name});

        // if(well_product=="")
        // {
        //     // resp.status(400).send({message:"Users not found"});
        //     resp.status(400).send({message:"Wellness category not found"});
        //     return ;
        // }
        // console.log(well_product);
        // const search_product=await well_product.aggregate([
        //     {
        //         $lookup:{
        //             from:'wellness_categories',
        //             localField:'wellness_category_id',
        //             foreignField:'_id',
        //             as:'category'
        //         }
        //     },
        //     {
        //         $project:{
        //             _id:0,  // if 1 then show the id
        //             wellness_product_name:1,
        //             wellness_image:1,
        //             wellness_category_name:'$category.wellness_category_name'
        //         }
        //     }
        // ])

        // resp.status(200).send(search_product);

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}


