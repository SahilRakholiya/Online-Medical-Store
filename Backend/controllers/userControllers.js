const userModel=require('../models/user');
const cartModel=require('../models/cart');
exports.displayuser=async(req,resp)=>{
    try{

        const user=await userModel.find({});
        if(user=="")
        {
            return resp.status(400).send({message:"Users not found"});
        }
        resp.status(200).send(user);

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertuser=(req,resp)=>{
    try{
        const user=req.body;
        userModel.findOne({name:user.name},async(err,user_search)=>{
            if(err)
            {
                console.error(err);
                resp.status(500).send(err);        
                return;
            }
            if(user_search)
            {
                console.log("User Name already exist ");
                resp.status(400).send("User Name already exist \n Please Enter another User Name");
                return;
            }
            userModel.findOne({email:user.email},async(err,user_search)=>{
                if(err)
                {
                    console.error(err);
                    resp.status(500).send(err);        
                    return;
                }
                if(user_search)
                {
                    console.log("Email Id already exist ");
                    resp.status(400).send("Email Id already exist \n Please Enter another Email Id");
                    return;
                }
                
                const newuser=new userModel({
                    name:user.name,
                    email:user.email,
                    password:user.password,
                    otp:user.otp,
                    address:user.address,
                    pincode:user.pincode,
                    state:user.state,
                    city:user.city
                })
            
                result= await newuser.save();
                resp.status(200).send(result);
        
            })
    
        });

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}
// updated password

exports.updateuser=async (req,resp)=>{
    try{
        const user=req.params.email;

        const user_search= await userModel.findOne({email:user});

        // const user=req.params;        
        // const user_search=userModel.findOne({email:user.email});

        // or
        // const user_search=userModel.findOne({email:req.params.email});

        
        if(!user_search)
        {
            return resp.status(400).send({message:"Users not found"});   
        }
        userModel.updateOne({_id:user_search._id},{
            $set:{
                password:req.body.password
            }
        },(err,user_update)=>{
            resp.status(500).send(user_update);
        })

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.deleteuser=async(req,resp)=>{
    try{
        // const id=req.params.id;
        const user_find=await userModel.findOne({_id:req.params.id});
        
        if(user_find==null)
        {
            return resp.status(400).send({message:"Users not found"});
        }
        const user_name=user_find.name;

        // How to remove cart collection beauty product data
        // 1.

        // const user_find = await userModel.find({_id:req.params.id}).select('_id');
        // console.log(user_find);
        // const temp=await cartModel.deleteMany({user_id:{$in:user_find}});


        // 2.

        /* Most imp thing is when we can store user id in _id variable 
        at that time must sure variable name must be _id when we use $in when we delete*/
        
        // console.log(user_id_find);

        // delete in cart collection
        await cartModel.deleteMany({user_id:req.params.id});


        // delete in user collection
        const user=await userModel.deleteOne({_id:req.params.id});
        resp.status(200).send({message:`${user_name} was deleted`});

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchuser=async(req,resp)=>{
    try{
        const uname=req.params.uname;
        const user= await userModel.find({name:uname});

        if(user=="")
        {
            // resp.status(400).send({message:"Users not found"});
            resp.status(400).send("Users not found");
            return ;
        }
        
            resp.status(200).send(user);
        
    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

