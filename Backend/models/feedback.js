const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

},{"versionKey":false});

module.exports = mongoose.model('orders',orderSchema);
