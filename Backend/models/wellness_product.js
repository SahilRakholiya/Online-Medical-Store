const mongoose = require('mongoose');

// const Schema = mongoose.Schema

const wellnessProductSchema = new mongoose.Schema({
    wellness_product_name:{
        type:String,
        required:true
    },
    wellness_image:{
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
    wellness_category_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'wellness_categories'
    }


},{"versionKey":false});

module.exports = mongoose.model('wellness_products',wellnessProductSchema);