const mongoose = require('mongoose');


const beautyCategorySchema = new mongoose.Schema({
    beauty_category_name : {
        type:String,
        required:true
    }
},{"versionKey":false});

module.exports = mongoose.model('beauty_categories',beautyCategorySchema);