const userModel = require('../models/user');
const cartModel = require('../models/cart');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middle/fetchuser');

const JWT_SECRET = 'mymeds@com/m/n/s-2023'

let success = false

exports.loginuser = async (req, resp) => {
    try {
        // const uname = req.body.name;
        // const pass = req.body.password;

        const { name, password } = req.body
        let user = await userModel.findOne({ name });
        if (!user) {
            return resp.status(400).send({ message: "User not found " });
        }
        const user_find = await userModel.findOne({ name, password });
        if (!user_find) {
            return resp.status(400).send({ message: "Please enter correct password" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const id = await user.id
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        resp.json({ success, authtoken, id })

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.displayuser = async (req, resp) => {
    try {

        const user = await userModel.find({});
        if (user == "") {
            return resp.status(400).send({ message: "Users not found" });
        }
        resp.status(200).send(user);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertuser = (req, resp) => {
    try {
        const user = req.body;

        userModel.findOne({ name: user.name }, async (err, user_search) => {
            if (err) {
                console.error(err);
                resp.status(500).send(err);
                return;
            }
            if (user_search) {
                success = false
                console.log("User Name already exist ");
                resp.status(400).send({ success, message: "User Name already exist \n Please Enter another User Name" });
                return;
            }
            userModel.findOne({ email: user.email }, async (err, user_search) => {
                if (err) {
                    console.error(err);
                    resp.status(500).send(err);
                    return;
                }
                if (user_search) {
                    success = false
                    console.log("Email Id already exist ");
                    resp.status(400).send({ success, message: "Email Id already exist \n Please Enter another Email Id" });
                    return;
                }

                const newuser = new userModel({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    otp: user.otp,
                    phone_number:user.phone_number,
                    address: user.address,
                    pincode: user.pincode,
                    state: user.state,
                    city: user.city
                })

                result = await newuser.save();
                const data = {
                    newuser: {
                        id: newuser.id
                    }
                }
                const authtoken = jwt.sign(data, JWT_SECRET)
                success = true
                resp.json({ success, authtoken })

            })

        });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}
// updated password

exports.updateuser = async (req, resp) => {
    try {
        const uemail = req.params.email;

        const { password } = req.body
        const newpass = {};
        if (password) { newpass.password = password }

        let user = await userModel.findOne({ email: uemail })
        if (!user) {
            success = false
            return resp.status(404).send({ success, message: "Not Found" })
        }

        user = await userModel.findByIdAndUpdate(user, { $set: newpass })
        success = true
        resp.status(200).send({ success, message: "successully change password" })
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.updateaddress = async (req, resp) => {
    try {
        const { address, pincode, state, city } = req.body
        // new note object 

        const newaddress = {};
        if (address) { newaddress.address = address }
        if (pincode) { newaddress.pincode = pincode }
        if (state) { newaddress.state = state }
        if (city) { newaddress.city = city }

        // find the note to be updated and update it

        let user = await userModel.findById(req.params.id)
        if (!user) {
            return resp.status(404).send("Not Found")
        }

        user = await userModel.findByIdAndUpdate(req.params.id, { $set: newaddress })

        resp.json({ user })
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.deleteuser = async (req, resp) => {
    try {
        // const id=req.params.id;
        const user_find = await userModel.findOne({ _id: req.params.id });

        if (user_find == null) {
            return resp.status(400).send({ message: "Users not found" });
        }
        const user_name = user_find.name;

        // How to remove cart collection beauty product data
        // 1.

        // const user_find = await userModel.find({_id:req.params.id}).select('_id');
        // console.log(user_find);
        // const temp=await cartModel.deleteMany({user_id:{$in:user_find}});


        // 2.

        /* Most imp thing is when we can store user id in _id variable 
        at that time must sure variable name must be _id when we use $in when we delete*/

        // console.log(user_id_find);

        // delete in cart collection
        await cartModel.deleteMany({ user_id: req.params.id });


        // delete in user collection
        const user = await userModel.deleteOne({ _id: req.params.id });
        resp.status(200).send({ message: `${user_name} was deleted` });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.searchuser = async (req, resp) => {
    try {
        let user = await userModel.findById(req.params.id)
        if (!user) {
            return resp.status(404).send("Not Found")
        }
        resp.send(user);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

