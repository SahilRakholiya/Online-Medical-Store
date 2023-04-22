const mongoose = require('mongoose');


const offerSchema = new mongoose.Schema({
    medicine_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'medicines'
    },
    wellness_product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'wellness_products'
    },
    beauty_product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'beauty_products'
    },
    offer_code:{
        type:String,
        required:true
    },      // create unique
    percentage:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
    // ,
    // image:{
    //     type:String,
    //     required:true
    // }


},{"versionKey":false});

module.exports = mongoose.model('offers',offerSchema);