const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    medicine_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medicines'
    },
    wellness_product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'wellness_products'
    },
    beauty_product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'beauty_products'
    },
    amount: 
        {
            type: Number,
            required: true,
            ref: 'medicines',
            ref: 'wellness_products',
            ref: 'beauty_products'

        }
        // ,
        // {
        //     type: Number,
        //     required: true,
        //     ref: 'wellness_products'
        // },
        // {
        //     type: Number,
        //     required: true,
        //     ref: 'beauty_products'
        // }

    


}, { "versionKey": false });

module.exports = mongoose.model('carts', cartSchema);