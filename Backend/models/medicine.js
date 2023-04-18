const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    medicine_name : {
        type:String,
        required:true
    },
    medicine_image:{
        type:String,
        required:true
    }
},{"versionKey":false});

module.exports = mongoose.model('medicines',medicineSchema);