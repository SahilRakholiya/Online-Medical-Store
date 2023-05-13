const medicineModel = require('../models/medicine');
const cartModel = require('../models/cart');
const fs = require('fs');
const path = require('path');
const cart = require('../models/cart');

exports.displaymedicine = async (req, resp) => {
    try {

        const medicine = await medicineModel.find({});
        if (medicine == "") {
            return resp.status(400).send({ message: "No Medicine Available" });
        }
        const all_products = medicine.map(products => ({
            _id: products._id,
            product_name: products.medicine_name,
            image_name: products.medicine_image,
            amount: products.amount,
            company: products.company,
            // i_path:products.i_path
            i_path: path.join(__dirname, '../', 'uploads', 'medicine', products.medicine_image)
        }))
        // i_path=path.join(__dirname, '../', 'uploads', 'medicine');
        resp.status(200).send(all_products);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}




exports.insertmedicine = (req, resp) => {
    try {
        const medicine = req.body;
        let image_name = "";
        if (req.file) {
            image_name = req.file.filename;
        } else {
            return resp.status(400).send({ message: "Please upload the images " });
        }
        // console.log(image_name);
        medicineModel.findOne({ medicine_name: medicine.product_name, company: medicine.company }, async (err, medicine_search) => {
            if (err) {
                console.error(err);
                resp.status(500).send(err);
                return;
            }
            if (medicine_search) {
                // image remove from the folder because error is generated
                // console.log(i_path);
                const i_path = path.join(__dirname, '../', 'uploads', 'medicine', image_name);
                fs.unlink(i_path, (err) => {
                    if (err) {
                        return resp.status(400).send({ message: err });
                    }
                });

                console.log("This company have already add this name off product ");
                return resp.status(400).send({ message: "This company have already add this name off product" });
            }


            const newmedicine = new medicineModel({
                medicine_name: medicine.product_name,
                medicine_image: image_name,
                amount: medicine.amount,
                company: medicine.company
            })


            result = await newmedicine.save();
            resp.status(200).send(result);

        })
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

// updated name

exports.updatemedicine = async (req, resp) => {
    try {
        const medicine_id = req.params.id;
        const medicine_update = req.body;
        let image_name = "";
        if (req.file) {
            image_name = req.file.filename;
        }
        // console.log(image_name);
        const medicine_search = await medicineModel.findOne({ _id: medicine_id });
        let temp = false;

        if (!medicine_search) {
            if (req.file) {
                // image remove from the folder because error is generated
                const i_path = path.join(__dirname, '../', 'uploads', 'medicine', image_name);
                // console.log(i_path);
                fs.unlink(i_path, (err) => {
                    if (err) {
                        return resp.status(400).send({ message: err });
                    }
                });
            }
            return resp.status(400).send({ message: "medicine not found" });
        }


        const filter = { _id: medicine_id };
        const update = { $set: {} };

        if (medicine_update.product_name) {

            if (medicine_update.company) {
                check_unique_data = await medicineModel.findOne({ medicine_name: medicine_update.product_name, company: medicine_update.company });
                if (check_unique_data) {
                    // console.log(check_unique_data);
                    if(image_name)
                    {
                        const i_path = path.join(__dirname, '../', 'uploads', 'medicine', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });    
                    }

                    console.log("ph1");
                    return resp.status(400).send({ message: "This company have already add this name off product" });
                }
            }

            if (!medicine_update.company) {
                check_unique_data = await medicineModel.findOne({ medicine_name: medicine_update.product_name, company: medicine_search.company });
                if (check_unique_data) {
                    if(image_name)
                    {
                        const i_path = path.join(__dirname, '../', 'uploads', 'medicine', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });    
                    }

                    // console.log(check_unique_data);
                    console.log("ph4");
                    return resp.status(400).send({ message: "This company have already add this name off product" });
                }
            }
            update.$set.medicine_name = medicine_update.product_name;
        }

        if (medicine_update.amount) {
            update.$set.amount = medicine_update.amount;
        }
        if (medicine_update.company) {
            if (!medicine_update.product_name) {
                check_unique_data = await medicineModel.findOne({ medicine_name: medicine_search.medicine_name, company: medicine_update.company });
                if (check_unique_data) {
                    if(image_name)
                    {
                        const i_path = path.join(__dirname, '../', 'uploads', 'medicine', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });    
                    }

                    console.log("ch4");
                    return resp.status(400).send({ message: "This company have already add this name off product" });
                }
            }
            update.$set.company = medicine_update.company;
        }
        if (req.file) {

            const i_path = path.join(__dirname, '../', 'uploads', 'medicine', medicine_search.medicine_image);
            // console.log(i_path);
            fs.unlink(i_path, (err) => {
                if (err) {
                    return resp.status(400).send({ message: err });
                }
            });

            update.$set.medicine_image = image_name;
        }

        const result = await medicineModel.updateOne(filter, update);
        if (result.modifiedCount != 0 && result.acknowledged!=false) {
            return resp.status(500).send({ message: "Data updated successfully" });
        }
        resp.status(500).send({ message: "Data Not updated" });
        // resp.status(500).send(result);
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.deletemedicine = async (req, resp) => {
    try {
        // const id=req.params.id;
        const medicine_find = await medicineModel.findOne({ _id: req.params.id });
        const mname = medicine_find.medicine_name;
        const cart_find = await cartModel.findOne({ medicine_id: req.params.id });

        if (cart_find != null) {
            await cartModel.deleteMany({ medicine_id: req.params.id });
        }

        if (medicine_find == null) {
            return resp.status(400).send({ message: "Medicine not found" });
        }

        const medicine_image_name = medicine_find.medicine_image;

        const i_path = path.join(__dirname, '../', 'uploads', 'medicine', medicine_image_name);
        // console.log(medicine_find.i_path);

        // console.log(i_path);
        fs.unlink(i_path, (err) => {
            if (err) {
                return resp.status(400).send({ message: err });
            }
        });

        // console.log(temp);
        // console.log(mname);
        // if(medicine.deletedCount==0)
        // {
        //     return resp.status(400).send({message:"medicine not found"});
        // }
        const medicine = await medicineModel.deleteOne({ _id: req.params.id });

        resp.status(200).send({ message: `${mname} was deleted` });    // .

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchmedicine = async (req, resp) => {
    try {
        const medicine_name = req.params.mname;
        const medicine = await medicineModel.find({ medicine_name: medicine_name });

        if (medicine == "") {
            // resp.status(400).send({message:"Users not found"});
            resp.status(400).send({ message: "medicine not found" });
            return;
        }

        const all_products = medicine.map(products => ({
            _id: products._id,
            product_name: products.medicine_name,
            image_name: products.medicine_image,
            amount: products.amount,
            company: products.company,
            i_path: path.join(__dirname, '../', 'uploads', 'medicine', products.medicine_image),
        }))

        resp.status(200).send(all_products);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

