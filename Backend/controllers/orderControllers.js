const userModel = require('../models/user');
const medicineModel = require('../models/medicine');
const wellnessProductModel = require('../models/wellness_product');
const beautyProductModel = require('../models/beauty_product');
const orderModel = require('../models/order');
const offerModel = require('../models/offer');

// For Admin side

exports.displayAllUserOrder = async (req, resp) => {
    try {

        const find_order = await orderModel.find({dispatch:false})
            .populate('user_id', 'name')
            .populate('orders.medicine_id', 'medicine_name')
            .populate('orders.wellness_product_id', 'wellness_product_name')
            .populate('orders.beauty_product_id', 'beauty_product_name')
            .populate('orders.offer_id', 'offer_code');
            
        if (find_order == null) {
            return resp.status(400).send({ message: "No Order Found" });
        }

        const all_order = find_order.map(groupedOrder => {
            const filteredOrders = groupedOrder.orders.map((order) => {
                if (order.offer_id !=null) {
                    if (order.medicine_id!= null) {
                        return {
                            Medicine_Name: order.medicine_id.medicine_name,
                            Offer_Code: order.offer_id.offer_code,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.wellness_product_id!= null) {
                        return {
                            Wellness_Product: order.wellness_product_id.wellness_product_name,
                            Offer_Code: order.offer_id.offer_code,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.beauty_product_id!= null) {
                        return {
                            Beauty_Product: order.beauty_product_id.beauty_product_name,
                            Offer_Code: order.offer_id.offer_code,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                }
                else {
                    if (order.medicine_id!=null) {
                        return {
                            Medicine_Name: order.medicine_id.medicine_name,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.wellness_product_id!= null) {
                        return {
                            Wellness_Product: order.wellness_product_id.wellness_product_name,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.beauty_product_id!=null) {
                        return {
                            Beauty_Product: order.beauty_product_id.beauty_product_name,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                }


            });
            return {
                _id: groupedOrder._id,
                orders: filteredOrders,
                user_name: groupedOrder.user_id.name,
                date: groupedOrder.user_id.date,
                dispatch: groupedOrder.dispatch,
                address: groupedOrder.address,
                order_total_amount: groupedOrder.order_total_amount
            };
        });

        resp.send(all_order);


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.searchAllUserOrder = async (req, resp) => {
    try {

        const oid=req.params.orderid;

        const find_order = await orderModel.find({_id:oid,dispatch:false})
            .populate('user_id', 'name')
            .populate('orders.medicine_id', 'medicine_name')
            .populate('orders.wellness_product_id', 'wellness_product_name')
            .populate('orders.beauty_product_id', 'beauty_product_name')
            .populate('orders.offer_id', 'offer_code');
            
        if (find_order == null) {
            return resp.status(400).send({ message: "No Order Found" });
        }

        const all_order = find_order.map(groupedOrder => {
            const filteredOrders = groupedOrder.orders.map((order) => {
                if (order.offer_id !=null) {
                    if (order.medicine_id!= null) {
                        return {
                            Medicine_Name: order.medicine_id.medicine_name,
                            Offer_Code: order.offer_id.offer_code,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.wellness_product_id!= null) {
                        return {
                            Wellness_Product: order.wellness_product_id.wellness_product_name,
                            Offer_Code: order.offer_id.offer_code,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.beauty_product_id!= null) {
                        return {
                            Beauty_Product: order.beauty_product_id.beauty_product_name,
                            Offer_Code: order.offer_id.offer_code,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                }
                else {
                    if (order.medicine_id!=null) {
                        return {
                            Medicine_Name: order.medicine_id.medicine_name,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.wellness_product_id!= null) {
                        return {
                            Wellness_Product: order.wellness_product_id.wellness_product_name,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.beauty_product_id!=null) {
                        return {
                            Beauty_Product: order.beauty_product_id.beauty_product_name,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                }


            });
            return {
                _id: groupedOrder._id,
                orders: filteredOrders,
                user_name: groupedOrder.user_id.name,
                date: groupedOrder.user_id.date,
                dispatch: groupedOrder.dispatch,
                address: groupedOrder.address,
                order_total_amount: groupedOrder.order_total_amount
            };
        });

        resp.send(all_order);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


// exports.dispatchUserOrder = async (req, resp) => {
//     try {
//         const i_no = req.params.ino;

//         const order_find = await orderModel.find({ invoice_number: i_no });
//         if (order_find == "") {
//             return resp.status(400).send({ message: "Order not found" });
//         }
//         // console.log(order_find);
//         // resp.send(order_find);

//         const filter = { invoice_number: i_no };
//         const update = { $set: {} };
//         update.$set.dispatch = true;

//         const result = await orderModel.updateMany(filter, update);
//         if (result.modifiedCount != 0) {
//             return resp.status(200).send({ message: "Order dispatch" });
//         }

//         resp.status(400).send({ message: "Order not dispatch" });


//     } catch (err) {
//         console.error(err);
//         resp.status(500).send(err);
//     }
// }




//  FOR CLIENT SIDE
exports.displayUserOrder = async (req, resp) => {
    try {

        const uid = req.params.userid;

        const find_user_in_database = await userModel.findOne({ _id: uid });
        if (find_user_in_database == null) {
            return resp.status(400).send({ message: "No User Found" });
        }

        const find_user_in_order = await orderModel.find({ user_id: uid ,dispatch:false})
            .populate('user_id', 'name')
            .populate('orders.medicine_id', 'medicine_name')
            .populate('orders.wellness_product_id', 'wellness_product_name')
            .populate('orders.beauty_product_id', 'beauty_product_name')
            .populate('orders.offer_id', 'offer_code')
        if (find_user_in_order == null) {
            return resp.status(400).send({ message: "No Order Found" });
        }

        const all_order = find_user_in_order.map(groupedOrder => {
            const filteredOrders = groupedOrder.orders.map((order) => {
                if (order.offer_id !=null) {
                    if (order.medicine_id!= null) {
                        return {
                            Medicine_Name: order.medicine_id.medicine_name,
                            Offer_Code: order.offer_id.offer_code,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.wellness_product_id!= null) {
                        return {
                            Wellness_Product: order.wellness_product_id.wellness_product_name,
                            Offer_Code: order.offer_id.offer_code,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.beauty_product_id!= null) {
                        return {
                            Beauty_Product: order.beauty_product_id.beauty_product_name,
                            Offer_Code: order.offer_id.offer_code,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                }
                else {
                    if (order.medicine_id!=null) {
                        return {
                            Medicine_Name: order.medicine_id.medicine_name,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.wellness_product_id!= null) {
                        return {
                            Wellness_Product: order.wellness_product_id.wellness_product_name,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                    if (order.beauty_product_id!=null) {
                        return {
                            Beauty_Product: order.beauty_product_id.beauty_product_name,
                            quantity: order.quantity,
                            total_amount: order.total_amount,
                        }
                    }
                }
            });
            return {
                _id: groupedOrder._id,
                orders: filteredOrders,
                user_name: groupedOrder.user_id.name,
                date: groupedOrder.user_id.date,
                dispatch: groupedOrder.dispatch,
                address: groupedOrder.address,
                order_total_amount: groupedOrder.order_total_amount
            };
        });

        resp.send(all_order);


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.AddProduct = async (req, resp) => {
    try {
        const orderid = req.params.orderid;
        const productid = req.params.productid;
        const order = req.body;


        if (!order.quantity) {
            return resp.status(400).send({ message: "Please enter quantity" });
        }

        const order_find = await orderModel.findOne({ _id: orderid });

        if (order_find == null) {
            return resp.status(400).send({ message: "Order not found" });
        }



        let t_amount, mid, offerid, wid, bid;

        let neworder_item;
        const medicine = await medicineModel.findOne({ _id: productid });
        if (medicine != null) {
            mid = medicine._id;
            const q_amount = (medicine.amount * order.quantity);
            if (order.offer_code) {
                const offer_percentage = await offerModel.findOne({ offer_code: order.offer_code, medicine_id: medicine._id });
                if (offer_percentage != null) {
                    console.log("hello");
                    t_amount = q_amount - ((q_amount * offer_percentage.percentage) / 100);
                }
                else {
                    return resp.status(400).send({ message: "Please enter valid offer code" });
                }
                offerid = offer_percentage._id;
            }
            else {
                t_amount = q_amount;
            }
            neworder_item = {

                medicine_id: mid,
                quantity: order.quantity,
                offer_id: offerid,
                total_amount: t_amount

            };

        }


        const wellness_Product = await wellnessProductModel.findOne({ _id: productid });
        if (wellness_Product != null) {
            // console.log(medicine);
            wid = wellness_Product._id;
            const q_amount = (wellness_Product.amount * order.quantity);
            if (order.offer_code) {
                const offer_percentage = await offerModel.findOne({ offer_code: order.offer_code, wellness_product_id: wellness_Product._id });
                if (offer_percentage != null) {
                    t_amount = q_amount - ((q_amount * offer_percentage.percentage) / 100);
                }
                else {
                    return resp.status(400).send({ message: "Please enter valid offer code" });
                }
                offerid = offer_percentage._id;
            }
            else {
                t_amount = q_amount;
            }
            neworder_item = {

                wellness_product_id: wid,
                quantity: order.quantity,
                offer_id: offerid,
                total_amount: t_amount

            };

        }


        const beauty_Product = await beautyProductModel.findOne({ _id: productid });
        if (beauty_Product != null) {
            // console.log(medicine);
            bid = beauty_Product._id;
            const q_amount = (beauty_Product.amount * order.quantity);
            if (order.offer_code) {
                const offer_percentage = await offerModel.findOne({ offer_code: order.offer_code, beauty_product_id: beauty_Product._id });
                if (offer_percentage != null) {
                    t_amount = q_amount - ((q_amount * offer_percentage.percentage) / 100);
                }
                else {
                    return resp.status(400).send({ message: "Please enter valid offer code" });
                }
                offerid = offer_percentage._id;
            }
            else {
                t_amount = q_amount;
            }
            neworder_item = {

                beauty_product_id: bid,
                quantity: order.quantity,
                offer_id: offerid,
                total_amount: t_amount

            };

        }



        const new_order_total_amount = order_find.order_total_amount + t_amount;
        const result = await orderModel.updateOne(
            {
                _id: orderid
            },
            {
                $push: {
                    orders: neworder_item
                },
                $set: {
                    order_total_amount: new_order_total_amount
                }

            }
        )

        if (result.modifiedCount == 1) {
            return resp.status(500).send({ message: "Product Added" });
        }
        resp.status(500).send({ message: "Product not added" });
        // resp.status(200).send(result);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.insertOrder = async (req, resp) => {
    try {
        const uid = req.params.userid;
        const productid = req.params.productid;
        const order = req.body;

        if (!order.quantity) {
            return resp.status(400).send({ message: "Please enter quantity" });
        }

        const user_find = await userModel.findOne({ _id: uid });
        if (user_find == null) {
            return resp.status(400).send({ message: "Please enter valid user." });
        }




        let t_amount, mid, offerid, wid, bid;

        let neworder;
        const medicine = await medicineModel.findOne({ _id: productid });
        if (medicine != null) {
            mid = medicine._id;
            const q_amount = (medicine.amount * order.quantity);
            if (order.offer_code) {
                const offer_percentage = await offerModel.findOne({ offer_code: order.offer_code, medicine_id: medicine._id });
                if (offer_percentage != null) {
                    console.log("hello");
                    t_amount = q_amount - ((q_amount * offer_percentage.percentage) / 100);
                }
                else {
                    return resp.status(400).send({ message: "Please enter valid offer code" });
                }
                offerid = offer_percentage._id;
            }
            else {
                t_amount = q_amount;
            }

            neworder = new orderModel({
                user_id: user_find._id,
                orders: {
                    medicine_id: mid,
                    quantity: order.quantity,
                    offer_id: offerid,
                    total_amount: t_amount
                },
                date: Date.now(),
                address: user_find.address,
                order_total_amount: t_amount
            })

        }

        const wellness_product = await wellnessProductModel.findOne({ _id: productid });
        if (wellness_product != null) {
            wid = wellness_product._id;
            const q_amount = (wellness_product.amount * order.quantity);
            if (order.offer_code) {
                const offer_percentage = await offerModel.findOne({ offer_code: order.offer_code, wellness_product_id: wellness_product._id });
                if (offer_percentage != null) {
                    t_amount = q_amount - ((q_amount * offer_percentage.percentage) / 100);
                }
                else {
                    return resp.status(400).send({ message: "Please enter valid offer code" });
                }
                offerid = offer_percentage._id;
            }
            else {
                t_amount = q_amount;
            }

            neworder = new orderModel({
                user_id: user_find._id,
                orders: {
                    wellness_product_id: wid,
                    quantity: order.quantity,
                    offer_id: offerid,
                    total_amount: t_amount
                },
                date: Date.now(),
                address: user_find.address,
                order_total_amount: t_amount
            })

        }

        const beauty_product = await beautyProductModel.findOne({ _id: productid });
        if (beauty_product != null) {
            bid = beauty_product._id;
            const q_amount = (beauty_product.amount * order.quantity);
            if (order.offer_code) {
                const offer_percentage = await offerModel.findOne({ offer_code: order.offer_code, beauty_product_id: beauty_product._id });
                if (offer_percentage != null) {
                    t_amount = q_amount - ((q_amount * offer_percentage.percentage) / 100);
                }
                else {
                    return resp.status(400).send({ message: "Please enter valid offer code" });
                }
                offerid = offer_percentage._id;
            }
            else {
                t_amount = q_amount;
            }

            neworder = new orderModel({
                user_id: user_find._id,
                orders: {
                    beauty_product_id: bid,
                    quantity: order.quantity,
                    offer_id: offerid,
                    total_amount: t_amount
                },
                date: Date.now(),
                address: user_find.address,
                order_total_amount: t_amount
            })

        }


        result = await neworder.save();
        resp.status(200).send(result);


    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.deleteOrder = async (req, resp) => {
    try {
        const uid = req.params.userid;
        const oid = req.params.orderid;

        const find_user = await userModel.findOne({ _id: uid });
        if (find_user == null) {
            return resp.status(500).send({ message: "No User Found" });
        }

        const order_find = await orderModel.findOne({_id:oid });

        if (order_find == null) {
            return resp.status(400).send({ message: "Order not found" });
        }
        // console.log(order_find);

        const temp = await orderModel.deleteOne({_id:oid, dispatch: false });

        if (temp.deletedCount != 0) {
            return resp.status(200).send({ message: `${order_find._id} is cancle successfully` });    // .
        }

        return resp.status(400).send({ message: "Order not cancel" });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}




exports.searchOrder = async (req, resp) => {
    try {

        const uid = req.params.userid;
        const pname = req.params.pname;


        const find_user_in_database = await userModel.findOne({ _id: uid });
        // console.log(find_user_in_database);
        if (find_user_in_database == "") {
            return resp.status(500).send({ message: "No User Found" });
        }

        const find_user_in_order = await orderModel.find({ user_id: uid });
        if (find_user_in_order == "") {
            return resp.status(500).send({ message: "No Order Found" });
        }

        const find_all_order = await orderModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'Username'
                }
            },
            {
                $lookup: {
                    from: 'medicines',
                    localField: 'medicine_id',
                    foreignField: '_id',
                    as: 'medicine_name'
                }
            },
            {
                $lookup: {
                    from: 'wellness_products',
                    localField: 'wellness_product_id',
                    foreignField: '_id',
                    as: 'wellness_product'
                }
            },
            {
                $lookup: {
                    from: 'beauty_products',
                    localField: 'beauty_product_id',
                    foreignField: '_id',
                    as: 'beauty_product'
                }
            },
            {
                $lookup: {
                    from: 'offers',
                    localField: 'offer_id',
                    foreignField: '_id',
                    as: 'offer'
                }
            },

            {
                $project: {
                    _id: 1,  // if 1 then show the id
                    Username: '$Username.name',
                    Medicine_Name: '$medicine_name.medicine_name',
                    Wellness_Product: '$wellness_product.wellness_product_name',
                    Beauty_Product: '$beauty_product.beauty_product_name',
                    date: 1,
                    Offer_Code: '$offer.offer_code',
                    total_amount: 1,
                    quantity: 1,
                    invoice_number: 1,
                    dispatch: 1,
                    address: 1
                }
            },

            {
                $group: {
                    _id: '$invoice_number',
                    orders: {
                        $push: '$$ROOT'
                    }
                }

            }
        ])


        const temp_order = find_all_order.map((groupedOrder) => {

            const filteredOrders = groupedOrder.orders.map((order) => {
                // console.log(order.Username);
                if (order.Username == find_user_in_database.name && order.dispatch == false) {
                    if (order.Offer_Code.length != 0) {
                        if (order.Medicine_Name.length != 0 && order.Medicine_Name == pname) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Medicine_Name: order.Medicine_Name

                            }
                        }
                        if (order.Wellness_Product.length != 0 && order.Wellness_Product == pname) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Wellness_Product: order.Wellness_Product

                            }
                        }
                        if (order.Beauty_Product.length != 0 && order.Beauty_Product == pname) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Beauty_Product: order.Beauty_Product
                            }
                        }
                    }
                    else {
                        if (order.Medicine_Name.length != 0 && order.Medicine_Name == pname) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Medicine_Name: order.Medicine_Name

                            }
                        }
                        if (order.Wellness_Product.length != 0 && order.Wellness_Product == pname) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Wellness_Product: order.Wellness_Product

                            }
                        }
                        if (order.Beauty_Product.length != 0 && order.Beauty_Product.length == pname) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Beauty_Product: order.Beauty_Product
                            }
                        }
                    }
                }

            });
            return { _id: groupedOrder._id, orders: filteredOrders };
        });

        // 1. all data with order and order field null or not

        const all_order = find_all_order.map((groupedOrder) => {

            const filteredOrders = groupedOrder.orders.map((order) => {
                // console.log(order.Username);
                if (order.Username == find_user_in_database.name && order.dispatch == false) {
                    if (order.Offer_Code.length != 0) {
                        if (order.Medicine_Name.length != 0) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Username: order.Username,
                                Medicine_Name: order.Medicine_Name,
                                date: order.date,
                                Offer_Code: order.Offer_Code,
                                total_amount: order.total_amount,
                                quantity: order.quantity,
                                invoice_number: order.invoice_number,
                                dispatch: order.dispatch,
                                address: order.address
                            }
                        }
                        if (order.Wellness_Product.length != 0) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Username: order.Username,
                                Wellness_Product: order.Wellness_Product,
                                date: order.date,
                                Offer_Code: order.Offer_Code,
                                total_amount: order.total_amount,
                                quantity: order.quantity,
                                invoice_number: order.invoice_number,
                                dispatch: order.dispatch,
                                address: order.address
                            }
                        }
                        if (order.Beauty_Product.length != 0) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Username: order.Username,
                                Beauty_Product: order.Beauty_Product,
                                date: order.date,
                                Offer_Code: order.Offer_Code,
                                total_amount: order.total_amount,
                                quantity: order.quantity,
                                invoice_number: order.invoice_number,
                                dispatch: order.dispatch,
                                address: order.address
                            }
                        }
                    }
                    else {
                        if (order.Medicine_Name.length != 0) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Username: order.Username,
                                Medicine_Name: order.Medicine_Name,
                                date: order.date,
                                total_amount: order.total_amount,
                                quantity: order.quantity,
                                invoice_number: order.invoice_number,
                                dispatch: order.dispatch,
                                address: order.address
                            }
                        }
                        if (order.Wellness_Product.length != 0) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Username: order.Username,
                                Wellness_Product: order.Wellness_Product,
                                date: order.date,
                                total_amount: order.total_amount,
                                quantity: order.quantity,
                                invoice_number: order.invoice_number,
                                dispatch: order.dispatch,
                                address: order.address
                            }
                        }
                        if (order.Beauty_Product.length != 0) {
                            return {
                                _id: order._id,  // if 1 then show the id
                                Username: order.Username,
                                Beauty_Product: order.Beauty_Product,
                                date: order.date,
                                total_amount: order.total_amount,
                                quantity: order.quantity,
                                invoice_number: order.invoice_number,
                                dispatch: order.dispatch,
                                address: order.address
                            }
                        }
                    }
                }

            });
            return { _id: groupedOrder._id, orders: filteredOrders };
        });


        // 2. convert null order object field not print
        const order_field_not_null = all_order.map((groupedOrder) => {

            const filteredOrders = groupedOrder.orders.filter((order) => order != null);

            return { _id: groupedOrder._id, orders: filteredOrders };
        });

        // 3. not print null order object 
        const order_not_null = order_field_not_null.filter(groupedOrder => groupedOrder.orders.length != 0);


        if (order_not_null == "") {
            return resp.status(400).send({ message: "No Product found" });
        }
        temp_order.map(order => console.log(order._id));
        // console.log(temp_order._id);

        resp.send(order_not_null);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

