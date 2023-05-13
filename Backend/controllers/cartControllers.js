const cartModel = require('../models/cart');
const userModel = require('../models/user');
const medicineModel = require('../models/medicine');
const wellnessProductModel = require('../models/wellness_product');
const beautyProductModel = require('../models/beauty_product');



// For Admin side 
exports.displayAllUsercart = async (req, resp) => {
    try {

        const cart = await cartModel.find()
            .populate('user_id', 'name')
            .populate('medicine_id', 'medicine_name')
            .populate('wellness_product_id', 'wellness_product_name')
            .populate('beauty_product_id', 'beauty_product_name')
            .select('_id user_id medicine_id wellness_product_id beauty_product_id amount');

        if (cart == "") {
            return resp.status(400).send({ message: "No Products are Available" });
        }

        const all_cart_data = cart.map(product => {
            if (product.medicine_id) {
                return {
                    _id: product._id,
                    name: product.user_id.name,
                    medicine_name: product.medicine_id.medicine_name,
                    amount: product.amount
                }
            }
            else {
                if (product.wellness_product_id)
                    return {
                        _id: product._id,
                        name: product.user_id.name,
                        wellness_product_name: product.wellness_product_id.wellness_product_name,
                        amount: product.amount
                    }
                else {
                    if (product.beauty_product_id)
                        return {
                            _id: product._id,
                            name: product.user_id.name,
                            beauty_product_name: product.beauty_product_id.beauty_product_name,
                            amount: product.amount
                        }
                }
            }
        })

        resp.status(200).send(all_cart_data);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.searchAllUsercart = async (req, resp) => {
    try {
        const pname = req.params.pname;

        const cart_find = await cartModel.find()
            .populate('user_id', 'name')
            .populate('medicine_id', 'medicine_name')
            .populate('wellness_product_id', 'wellness_product_name')
            .populate('beauty_product_id', 'beauty_product_name')
            .select('_id user_id medicine_id wellness_product_id beauty_product_id amount');
        // console.log(user_cart);

        const all_cart = cart_find.map(cart => {
            if (cart.medicine_id != null && cart.medicine_id.medicine_name == pname) {
                return {
                    _id: cart._id,
                    name: cart.user_id.name,
                    medicine_name: cart.medicine_id.medicine_name,
                    amount: cart.amount
                }
            }
            else {
                if (cart.wellness_product_id != null && cart.wellness_product_id.wellness_product_name == pname)
                    return {
                        _id: cart._id,
                        name: cart.user_id.name,
                        wellness_product_name: cart.wellness_product_id.wellness_product_name,
                        amount: cart.amount
                    }
                else {
                    if (cart.beauty_product_id != null && cart.beauty_product_id.beauty_product_name == pname)
                        return {
                            _id: cart._id,
                            name: cart.user_id.name,
                            beauty_product_name: cart.beauty_product_id.beauty_product_name,
                            amount: cart.amount
                        }
                }
            }
        })

        const cart_filter = all_cart.filter(cart => cart != null);
        if (cart_filter == "") {
            return resp.status(400).send({ message: "Product not found" });
        }

        // console.log(cart_filter);
        resp.status(200).send(cart_filter);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


// if admin require perticular user cart product delete then this api call


// exports.deletecart = async (req, resp) => {
//     try {
//         const cart_find = await cartModel.findOne({ _id: req.params.id });

//         if (cart_find == null) {
//             return resp.status(400).send({ message: "Product not found" });
//         }
//         // console.log(cart_find);
//         let product="";
//         if(cart_find.medicine_id)
//         {
//             const medicine_product = await medicineModel.findOne({_id:cart_find.medicine_id});
//             if(medicine_product==null)
//             {
//                 return resp.status(400).send({ message: "Medicine Not found " });
//             }

//             // console.log(medicine_product);
//             product=medicine_product.medicine_name;
//         }
//         else{
//             if(cart_find.wellness_product_id)
//             {
//                 const wellness_product=await wellnessProductModel.findOne({_id:cart_find.wellness_product_id});
//                 if(wellness_product==null)
//                 {
//                     return resp.status(400).send({ message: "Wellness Product Not found " });
//                 }

//                 product=wellness_product.wellness_product_name;
//             }
//             else{
//                 if(cart_find.beauty_product_id)
//                 {
//                     const beauty_product=await beautyProductModel.findOne({_id:cart_find.beauty_product_id});
//                     if(beauty_product==null)
//                     {
//                         return resp.status(400).send({ message: "Beauty Product Not found " });
//                     }

//                     product=beauty_product.beauty_product_name;                    
//                 }
//             }
//         }

//         const cart = await cartModel.deleteOne({ _id: req.params.id });

//         resp.status(200).send({ message: `${product} was deleted` });    // .

//     } catch (err) {
//         console.error(err);
//         resp.status(500).send(err);
//     }
// }





// For Client side
exports.displaycart = async (req, resp) => {
    try {

        const uid = req.params.userid;
        const user = await userModel.find({ _id: uid });
        const cart = await cartModel.find({ user_id: uid })
            .populate('user_id', 'name')
            .populate('medicine_id', 'medicine_name')
            .populate('wellness_product_id', 'wellness_product_name')
            .populate('beauty_product_id', 'beauty_product_name')
            .select('_id user_id medicine_id wellness_product_id beauty_product_id amount');

        if (user == "") {
            // resp.status(400).send({message:"Users not found"});
            resp.status(400).send({ message: "user not found" });
            return;
        }

        if (cart == "") {
            return resp.status(400).send({ message: "No Products are Available" });
        }

        const all_cart_data = cart.map(product => {
            if (product.medicine_id) {
                return {
                    _id: product._id,
                    name: product.user_id.name,
                    medicine_name: product.medicine_id.medicine_name,
                    amount: product.amount
                }
            }
            else {
                if (product.wellness_product_id)
                    return {
                        _id: product._id,
                        name: product.user_id.name,
                        wellness_product_name: product.wellness_product_id.wellness_product_name,
                        amount: product.amount
                    }
                else {
                    if (product.beauty_product_id)
                        return {
                            _id: product._id,
                            name: product.user_id.name,
                            beauty_product_name: product.beauty_product_id.beauty_product_name,
                            amount: product.amount
                        }
                }
            }
        })

        resp.status(200).send(all_cart_data);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.insertcart = async (req, resp) => {
    try {
        const uid = req.params.userid;
        const cart = req.body;
        const user_find = await userModel.findOne({ _id: uid });
        // const cart_user_find = await cartModel.findOne({user_id:user_find._id});
        // .populate('user_id','name')
        // .populate('medicine_id','medicine_name')
        // .populate('wellness_product_id','wellness_product_name')
        // .populate('beauty_product_id','beauty_product_name')

        if (user_find == null) {
            return resp.status(400).send({ message: "Please enter valid user." });
        }

        const newcart = new cartModel({
            user_id: user_find._id
        })


        if ((cart.medicine_name && cart.wellness_product_name) || (cart.wellness_product_name && cart.beauty_product_name) || (cart.beauty_product_name && cart.medicine_name)) {
            return resp.status(400).send({ message: "Please enter only medicine name or wellness product name or beauty product name" });
        }
        if (cart.medicine_name) {
            const medicine = await medicineModel.findOne({ medicine_name: cart.medicine_name });
            if (medicine == null) {
                return resp.status(400).send({ message: "Medicine Not found " });
            }

            const check = await cartModel.findOne({ user_id: uid, medicine_id: medicine._id })

            if (check == null) {
                // console.log(medicine.amount);
                newcart.medicine_id = medicine._id;
                newcart.amount = medicine.amount;

            }
            else {
                return resp.status(400).send({ message: "Medicine already availble in to the cart " });
            }
        }
        else {
            if (cart.wellness_product_name) {
                const wellness_product = await wellnessProductModel.findOne({ wellness_product_name: cart.wellness_product_name });
                if (wellness_product == null) {
                    return resp.status(400).send({ message: "Wellness Product Not found " });
                }


                const check = await cartModel.findOne({ user_id: uid, wellness_product_id: wellness_product._id })

                if (check == null) {
                    newcart.wellness_product_id = wellness_product._id;
                    newcart.amount = wellness_product.amount;

                }
                else {
                    return resp.status(400).send({ message: "Wellness Product already availble in to the cart " });
                }
            }
            else {
                if (cart.beauty_product_name) {
                    const beauty_product = await beautyProductModel.findOne({ beauty_product_name: cart.beauty_product_name });
                    if (beauty_product == null) {
                        return resp.status(400).send({ message: "Beauty Product Not found " });
                    }
                    const check = await cartModel.findOne({ user_id: uid, beauty_product_id: beauty_product._id })

                    if (check == null) {
                        // console.log(medicine.amount);
                        newcart.beauty_product_id = beauty_product._id;
                        newcart.amount = beauty_product.amount;
                    }
                    else {
                        return resp.status(400).send({ message: "Beauty Product already availble in to the cart " });
                    }

                }
                else {
                    return resp.status(400).send({ message: "Please select Medicine or wellness product or beauty products" });
                }
            }
        }

        result = await newcart.save();
        resp.status(200).send(result);

        // // insert when no user find
        // if (cart_user_find=="") {

        // }
        // else {
        // }


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

// updated name

// exports.updatecart = async (req, resp) => {
//     try {
//         const cart_id = req.params.id;

//         const cart_search = await cartModel.findOne({ _id: cart_id });

//         if (!cart_search) {
//             return resp.status(400).send({ message: "cart not found" });
//         }

//         cartModel.updateOne({ _id: cart_id }, {
//             $set: {
//                 cart_name: req.body.name
//             }
//         }, (err, cart_update) => {
//             resp.status(500).send(cart_update);
//         })

//     } catch (err) {
//         console.error(err);
//         resp.status(500).send(err);
//     }
// }


exports.deletecart = async (req, resp) => {
    try {
        const uid = req.params.user_id;
        const cid = req.params.cartid;

        const user_cart = await cartModel.findOne({ user_id: uid });
        const cart_find = await user_cart.findOne({ _id: cid });

        if (user_cart == "") {
            // resp.status(400).send({message:"Users not found"});
            resp.status(400).send({ message: "user not found" });
            return;
        }

        if (cart_find == null) {
            return resp.status(400).send({ message: "Product not found" });
        }
        // console.log(cart_find);
        let product = "";
        if (cart_find.medicine_id) {
            const medicine_product = await medicineModel.findOne({ _id: cart_find.medicine_id });
            if (medicine_product == null) {
                return resp.status(400).send({ message: "Medicine Not found " });
            }

            // console.log(medicine_product);
            product = medicine_product.medicine_name;
        }
        else {
            if (cart_find.wellness_product_id) {
                const wellness_product = await wellnessProductModel.findOne({ _id: cart_find.wellness_product_id });
                if (wellness_product == null) {
                    return resp.status(400).send({ message: "Wellness Product Not found " });
                }

                product = wellness_product.wellness_product_name;
            }
            else {
                if (cart_find.beauty_product_id) {
                    const beauty_product = await beautyProductModel.findOne({ _id: cart_find.beauty_product_id });
                    if (beauty_product == null) {
                        return resp.status(400).send({ message: "Beauty Product Not found " });
                    }

                    product = beauty_product.beauty_product_name;
                }
            }
        }

        const cart = await cartModel.deleteOne({ _id: req.params.id });

        resp.status(200).send({ message: `${product} was deleted` });    // .

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchcart = async (req, resp) => {
    try {
        const uid = req.params.userid;
        const pname = req.params.pname;

        const user_cart = await cartModel.find({ user_id: uid })
            .populate('user_id', 'name')
            .populate('medicine_id', 'medicine_name')
            .populate('wellness_product_id', 'wellness_product_name')
            .populate('beauty_product_id', 'beauty_product_name')
            .select('_id user_id medicine_id wellness_product_id beauty_product_id amount');
        // console.log(user_cart);
        if (user_cart == "") {
            // resp.status(400).send({message:"Users not found"});
            resp.status(400).send({ message: "user not found" });
            return;
        }
        const cart_search = user_cart.map(cart => {
            if (cart.medicine_id != null && cart.medicine_id.medicine_name == pname) {
                return {
                    _id: cart._id,
                    name: cart.user_id.name,
                    medicine_name: cart.medicine_id.medicine_name,
                    amount: cart.amount
                }
            }
            else {
                if (cart.wellness_product_id != null && cart.wellness_product_id.wellness_product_name == pname)
                    return {
                        _id: cart._id,
                        name: cart.user_id.name,
                        wellness_product_name: cart.wellness_product_id.wellness_product_name,
                        amount: cart.amount
                    }
                else {
                    if (cart.beauty_product_id != null && cart.beauty_product_id.beauty_product_name == pname)
                        return {
                            _id: cart._id,
                            name: cart.user_id.name,
                            beauty_product_name: cart.beauty_product_id.beauty_product_name,
                            amount: cart.amount
                        }
                }
            }
        })

        const cart_filter = cart_search.filter(cart => cart != null);
        if (cart_filter == "") {
            return resp.status(400).send({ message: "Product not found" });
        }

        // console.log(cart_filter);
        resp.status(200).send(cart_filter);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

