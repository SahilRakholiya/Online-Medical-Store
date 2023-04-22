const medicineModel=require('../models/medicine');
const cartModel=require('../models/cart');
const fs= require('fs');
const path=require('path');
const cart = require('../models/cart');

exports.displaymedicine=async(req,resp)=>{
    try{

        const medicine=await medicineModel.find({});
        if(medicine=="")
        {
            return resp.status(400).send({message:"No Medicine Available"});
        }
        const all_products=medicine.map(products=>({
            _id:products._id,
            product_name:products.medicine_name,
            image_name:products.medicine_image,
            i_path: path.join(__dirname, '../', 'uploads', 'medicine', products.medicine_image)
        }))

        resp.status(200).send(medicine);

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}




exports.insertmedicine=(req,resp)=>{
    try{
        const medicine=req.body;
        const image_name=req.file.filename
        medicineModel.findOne({medicine_name:medicine.name},async(err,medicine_search)=>{
            if(err)
            {
                console.error(err);
                resp.status(500).send(err);        
                return;
            }
            if(medicine_search)
            {
                console.log("medicine name already exist ");
                resp.status(400).send("medicine name already exist ");
                return;
            }
            const newmedicine=new medicineModel({
                medicine_name:medicine.name,
                medicine_image:image_name,
                amount:medicine.amount
            })
        
            result= await newmedicine.save();
            resp.status(200).send(result);
    
        })
    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

// updated name

exports.updatemedicine=async (req,resp)=>{
    try{
        const medicine_id=req.params.id;

        const medicine_search= await medicineModel.findOne({_id:medicine_id});

        
        
        if(!medicine_search)
        {
            return resp.status(400).send({message:"medicine not found"});   
        }
        medicineModel.updateOne({_id:medicine_id},{
            $set:{
                medicine_name:req.body.name
            }
        },(err,medicine_update)=>{
            resp.status(500).send(medicine_update);
        })

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
        }
}


exports.deletemedicine=async(req,resp)=>{
    try{
        // const id=req.params.id;
        const medicine_find=await medicineModel.findOne({_id:req.params.id});
        const mname=medicine_find.medicine_name;
        const cart_find=await cartModel.findOne({medicine_id:req.params.id});
        
        if(cart_find!=null)
        {
            await cartModel.deleteMany({medicine_id:req.params.id});
        }

        if(medicine_find==null)
        {
            return resp.status(400).send({message:"Medicine not found"});
        }
        
        const medicine_image_name=medicine_find.medicine_image;
        
        const i_path=path.join(__dirname,'../','uploads','medicine',medicine_image_name);
        // console.log(i_path);
        fs.unlink(i_path,(err)=>{
            if(err)
            {
                return resp.status(400).send({message:err});
            }
        });
        
        // console.log(temp);
        // console.log(mname);
        // if(medicine.deletedCount==0)
        // {
        //     return resp.status(400).send({message:"medicine not found"});
        // }
        const medicine =await medicineModel.deleteOne({_id:req.params.id});
        
        resp.status(200).send({message:`${mname} was deleted`});    // .

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchmedicine=async(req,resp)=>{
    try{
        const medicine_name=req.params.mname;
        const medicine= await medicineModel.find({medicine_name:medicine_name});

        if(medicine=="")
        {
            // resp.status(400).send({message:"Users not found"});
            resp.status(400).send("medicine not found");
            return ;
        }
        
            resp.status(200).send(medicine);
        
    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

