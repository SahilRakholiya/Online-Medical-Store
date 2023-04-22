const feedbackModel=require('../models/feedback');
const userModel=require('../models/user');

exports.displayfeedback=async(req,resp)=>{
    try{

        const feedback_populate=await feedbackModel.find().populate('user_id','name');
        if(feedback_populate=="")
        {
            return resp.status(400).send({message:"feedbacks not found"});
        }
        const all_feedback=feedback_populate.map(feedback=>({
            _id:feedback._id,
            name:feedback.user_id.name,
            topic:feedback.topic,
            description:feedback.description
        }))
        resp.status(200).send(all_feedback);

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertfeedback=async(req,resp)=>{
    try{
        const feedback=req.body;
        const u_id=await userModel.findOne({name:feedback.name});

        if(u_id==null)
        {
            console.log("User Name not found");
            return resp.status(400).send("User Name not found");        
        }

        const newfeedback=new feedbackModel({
            user_id:u_id._id,
            topic:feedback.topic,
            description:feedback.description
        })
    
        result= await newfeedback.save();
        resp.status(200).send(result);


    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}


// exports.updatefeedback=async (req,resp)=>{
//     try{
//         const feedback=req.params.email;

//         const feedback_search= await feedbackModel.findOne({email:feedback});

//         // const feedback=req.params;        
//         // const feedback_search=feedbackModel.findOne({email:feedback.email});

//         // or
//         // const feedback_search=feedbackModel.findOne({email:req.params.email});

        
//         if(!feedback_search)
//         {
//             return resp.status(400).send({message:"feedbacks not found"});   
//         }
//         feedbackModel.updateOne({_id:feedback_search._id},{
//             $set:{
//                 password:req.body.password
//             }
//         },(err,feedback_update)=>{
//             resp.status(500).send(feedback_update);
//         })

//     }catch(err)
//     {
//         console.error(err);
//         resp.status(500).send(err);
//     }
// }


exports.deletefeedback=async(req,resp)=>{
    try{

        const feedback=await feedbackModel.findOne({_id:req.params.id});
        if(feedback==null)
        {
            return resp.status(400).send({message:"feedback not found"});
        }
        await feedbackModel.deleteOne({_id:req.params.id});
        // if(feedback.deletedCount==0)
        // {
        //     return resp.status(400).send({message:"feedbacks not found"});
        // }
        resp.status(200).send({message:`${feedback.topic} was deleted`});

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchfeedback=async(req,resp)=>{
    try{
        const feedback_topic=req.params.topic;
        const feedback= await feedbackModel.find({topic:feedback_topic});

        if(feedback=="")
        {
            // resp.status(400).send({message:"feedbacks not found"});
            resp.status(400).send("feedbacks not found");
            return ;
        }
        
            resp.status(200).send(feedback);
        
    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}

