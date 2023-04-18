const beautyCategoryModel=require('../models/beauty_category');
const beautyProductModel=require('../models/beauty_product');

exports.displayBeautyCategory=async(req,resp)=>{
    try{

        const beauty_cat=await beautyCategoryModel.find({});
        if(beauty_cat=="")
        {
            return resp.status(400).send({message:"Beauty Category not found"});
        }
        resp.status(200).send(beauty_cat);

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertBeautyCategory=(req,resp)=>{
    try{
        const beauty_cat=req.body;
        beautyCategoryModel.findOne({beauty_category_name:beauty_cat.cat_name},async(err,beauty_cat_search)=>{
            if(err)
            {
                console.error(err);
                resp.status(500).send(err);        
                return;
            }
            if(beauty_cat_search)
            {
                console.log("Category Name already exist ");
                resp.status(400).send({message:"Category Name already exist "});
                return;
            }
            const newBeautyCat=new beautyCategoryModel({
                beauty_category_name:beauty_cat.cat_name
            })
        
            result= await newBeautyCat.save();
            resp.status(200).send(result);
    
        })
    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.updateBeautyCategory=async (req,resp)=>{
    try{
        const beauty_cat_id=req.params.id;

        const beauty_cat_search= await beautyCategoryModel.findOne({_id:beauty_cat_id});

        
        if(!beauty_cat_search)
        {
            return resp.status(400).send({message:"Beauty Category not found"});   
        }
        beautyCategoryModel.updateOne({_id:beauty_cat_id},{
            $set:{
                beauty_category_name:req.body.cat_name
            }
        },(err,beauty_cat_update)=>{
            resp.status(500).send(beauty_cat_update);
        })

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

// also delete child record
exports.deleteBeautyCategory=async(req,resp)=>{
    try{
        // const id=req.params.id;
        const beauty_cat_id=await beautyCategoryModel.findOne({_id:req.params.id});
        if(beauty_cat_id==null)
        {
            return resp.status(400).send({message:"Beauty category not found"});
        }
        const beauty_cat_name=beauty_cat_id.beauty_category_name;
        await beautyProductModel.deleteMany({beauty_category_id:beauty_cat_id});
        
        const beauty_cat=await beautyCategoryModel.deleteOne({_id:req.params.id});
        
        resp.status(200).send({message:`${beauty_cat_name} was deleted`});

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchBeautyCategory=async(req,resp)=>{
    try{
        const beauty_cat_name=req.params.cat_name;
        const beauty_cat= await beautyCategoryModel.find({beauty_category_name:beauty_cat_name});

        if(beauty_cat=="")
        {
            // resp.status(400).send({message:"Users not found"});
            resp.status(400).send({message:"Beauty category not found"});
            return ;
        }
        
            resp.status(200).send(beauty_cat);
        
    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

