const mongoose = require('mongoose');


const wellnessCategorySchema = new mongoose.Schema({
    wellness_category_name : {
        type:String,
        required:true
    }
},{"versionKey":false});

module.exports = mongoose.model('wellness_categories',wellnessCategorySchema);

