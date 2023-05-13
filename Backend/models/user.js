const mongoose = require('mongoose');

// const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    phone_number:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
        // roleid : {type:Schema.Types.ObjectId,ref:'Role'}
},{"versionKey":false});

module.exports = mongoose.model('users',userSchema);