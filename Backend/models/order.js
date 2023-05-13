const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    orders:[{
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
        offer_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'offers'
        },
        quantity:{
            type:Number,
            required:true
        },
        total_amount:{
            type:Number,
            required:true
        }
        
    }],
    date:{
        type:Date,
        required:true
    },
    dispatch:{
        type:Boolean,
        required:true,
        default:false        
    },
    address:{
        type:String,
        required:true
    },
    order_total_amount:{
        type:Number,
        required:true
    }
},{"versionKey":false});

module.exports = mongoose.model('orders',orderSchema);