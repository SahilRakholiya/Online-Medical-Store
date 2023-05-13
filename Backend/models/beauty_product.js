const mongoose = require('mongoose');


const beautyProductSchema = new mongoose.Schema({
    beauty_product_name : {
        type:String,
        required:true
    },
    beauty_image:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    beauty_category_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'beauty_categories'
    }


},{"versionKey":false});

module.exports = mongoose.model('beauty_products',beautyProductSchema);