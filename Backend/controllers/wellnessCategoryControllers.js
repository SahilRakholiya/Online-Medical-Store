const wellnessCategoryModel=require('../models/wellness_category');
const wellnessProductModel=require('../models/wellness_product');

exports.displayWellnessCategory=async(req,resp)=>{
    try{

        const well_cat=await wellnessCategoryModel.find({});
        if(well_cat=="")
        {
            return resp.status(400).send({message:"Wellness Category not found"});
        }
        resp.status(200).send(well_cat);

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertWellnessCategory=(req,resp)=>{
    try{
        const well_cat=req.body;
        wellnessCategoryModel.findOne({wellness_category_name:well_cat.cat_name},async(err,well_cat_search)=>{
            if(err)
            {
                console.error(err);
                resp.status(500).send(err);        
                return;
            }
            if(well_cat_search)
            {
                console.log("Category Name already exist ");
                resp.status(400).send({message:"Category Name already exist "});
                return;
            }
            const newWellCat=new wellnessCategoryModel({
                wellness_category_name:well_cat.cat_name
            })
        
            result= await newWellCat.save();
            resp.status(200).send(result);
    
        })
    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.updateWellnessCategory=async (req,resp)=>{
    try{
        const well_cat_id=req.params.id;

        const well_cat_search= await wellnessCategoryModel.findOne({_id:well_cat_id});

        
        if(!well_cat_search)
        {
            return resp.status(400).send({message:"Wellness Category not found"});   
        }
        wellnessCategoryModel.updateOne({_id:well_cat_id},{
            $set:{
                wellness_category_name:req.body.cat_name
            }
        },(err,well_cat_update)=>{
            resp.status(500).send(well_cat_update);
        })

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

// also delete child record
exports.deleteWellnessCategory=async(req,resp)=>{
    try{
        // const id=req.params.id;
        const well_cat_id=await wellnessCategoryModel.findOne({_id:req.params.id});
        const well_cat_name=well_cat_id.wellness_category_name;
        await wellnessProductModel.deleteMany({wellness_category_id:well_cat_id});

        const well_cat=await wellnessCategoryModel.deleteOne({_id:req.params.id});
        if(well_cat.deletedCount==0)
        {
            return resp.status(400).send({message:"Wellness category not found"});
        }
        resp.status(200).send({message:`${well_cat_name} was deleted`});

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchWellnessCategory=async(req,resp)=>{
    try{
        const well_cat_name=req.params.cat_name;
        const well_cat= await wellnessCategoryModel.find({wellness_category_name:well_cat_name});

        if(well_cat=="")
        {
            // resp.status(400).send({message:"Users not found"});
            resp.status(400).send({message:"Wellness category not found"});
            return ;
        }
        
            resp.status(200).send(well_cat);
        
    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

