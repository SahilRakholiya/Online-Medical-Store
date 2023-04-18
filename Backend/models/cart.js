const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
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
    amount:{
        type:Number,
        required:true
    }


},{"versionKey":false});

module.exports = mongoose.model('carts',cartSchema);