const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
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
    total_amount:{
        type:Number,
        required:true
    },
    quanity:{
        type:Number,
        required:true
    }
},{"versionKey":false});

module.exports = mongoose.model('orders',orderSchema);