const wellnessProductModel = require('../models/wellness_product');
const wellnessCategoryModel = require('../models/wellness_category');
const cartModel = require('../models/cart');

const fs = require('fs');
const path = require('path');

exports.displayWellnessProduct = async (req, resp) => {
    try {

        // 1. method
        const well_product = await wellnessProductModel.find().populate('wellness_category_id', 'wellness_category_name');

        const all_products = well_product.map(products => ({
            _id: products._id,
            product_name: products.wellness_product_name,
            image_name: products.wellness_image,
            amount: products.amount,
            company: products.company,
            wellness_category_name: products.wellness_category_id.wellness_category_name,
            i_path: path.join(__dirname, '../', 'uploads', 'wellness_product', products.wellness_image)
        }))
        if (all_products == "") {
            return resp.status(400).send({ message: "Wellness Product not found" });
        }

        resp.status(200).send(all_products);


        // 2. second method

        // const well_product=await wellnessProductModel.find({});
        // if(well_product=="")
        // {
        //     return resp.status(400).send({message:"Wellness Product not found"});
        // }

        // const all_products=await wellnessProductModel.aggregate([
        //     {
        //         $lookup:{
        //             from:'wellness_categories',
        //             localField:'wellness_category_id',
        //             foreignField:'_id',
        //             as:'category'
        //         }
        //     },
        //     {
        //         $project:{
        //             _id:0,  // if 1 then show the id
        //             wellness_product_name:1,
        //             wellness_image:1,
        //             wellness_category_name:'$category.wellness_category_name'
        //         }
        //     }
        // ])

        // resp.status(200).send(all_products);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertWellnessProduct = async (req, resp) => {
    try {
        const well_product = req.body;
        let image_name = "";
        if (req.file) {
            image_name = req.file.filename;
        } else {
            return resp.status(400).send({ message: "Please upload the images " });
        }


        const cat_name = await wellnessCategoryModel.findOne({ wellness_category_name: well_product.wellness_category_name });
        // console.log(cat_name);
        
        const well_product_find = await wellnessProductModel.findOne({wellness_product_name:well_product.product_name,wellness_category_id:cat_name._id, company: well_product.company});
        
        if (!cat_name || well_product_find) {
            // image remove from the folder because error is generated
            const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', image_name);
            // console.log(i_path);
            fs.unlink(i_path, (err) => {
                if (err) {
                    return resp.status(400).send({ message: err });
                }
            });
            if (well_product_find) {
                return resp.status(400).send({ message: "Wellness product name and wellness product company already exist " });
            }    
            if(!cat_name)
            {
                return resp.status(400).send({ message: "Invalid category name" });   
            }

        }


        const newwell_product = new wellnessProductModel({
            wellness_product_name: well_product.product_name,
            wellness_image: image_name,
            amount: well_product.amount,
            company: well_product.company,
            wellness_category_id: cat_name._id
        })

        result = await newwell_product.save();
        resp.status(200).send(result);
    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

// update product name
exports.updateWellnessProduct = async (req, resp) => {
    try {
        const well_product_id = req.params.id;
        const well_product = req.body;

        let image_name = "";
        if (req.file) {
            image_name = req.file.filename;
        }

        const well_product_find = await wellnessProductModel.findOne({ _id: well_product_id });

        if (!well_product_find) {
            if (req.file) {
                // image remove from the folder because error is generated
                const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', image_name);
                // console.log(i_path);
                fs.unlink(i_path, (err) => {
                    if (err) {
                        return resp.status(400).send({ message: err });
                    }
                });
            }
            return resp.status(400).send({ message: "Wellness Product not found" });
        }

        const filter = { _id: well_product_id };
        const update = { $set: {} };

        if (well_product.product_name) {

            if(well_product.wellness_category_name && !well_product.company)
            {
                const wellness_cat_id = await wellnessCategoryModel.findOne({ wellness_category_name: well_product.wellness_category_name })
                check_unique_data=await wellnessProductModel.findOne({wellness_product_name:well_product.product_name,wellness_category_id:wellness_cat_id._id,company:well_product_find.company});
                if(check_unique_data)
                {
                    // console.log(check_unique_data);
                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }
                    console.log("ph1");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }

            if(well_product.company && !well_product.wellness_category_name)
            {
                check_unique_data=await wellnessProductModel.findOne({wellness_product_name:well_product.product_name,wellness_category_id:well_product_find.wellness_category_id,company:well_product.company});
                if(check_unique_data)
                {
                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }
                    console.log("ph2");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }

            if(well_product.company && well_product.wellness_category_name)
            {
                const wellness_cat_id = await wellnessCategoryModel.findOne({ wellness_category_name: well_product.wellness_category_name })
                check_unique_data=await wellnessProductModel.findOne({wellness_product_name:well_product.product_name,wellness_category_id:wellness_cat_id._id,company:well_product.company});
                if(check_unique_data)
                {
                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }
                    console.log("ph3");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }
            if(!well_product.company && !well_product.wellness_category_name)
            {
                check_unique_data=await wellnessProductModel.findOne({wellness_product_name:well_product.product_name,wellness_category_id:well_product_find.wellness_category_id,company:well_product_find.company});
                if(check_unique_data)
                {
                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }
                    // console.log(check_unique_data);
                    console.log("ph4");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }

            update.$set.wellness_product_name = well_product.product_name;
        }

        if (well_product.amount) {
            update.$set.amount = well_product.amount;
        }

        if (well_product.company) {
            if(well_product.wellness_category_name && !well_product.product_name)
            {
                const wellness_cat_id = await wellnessCategoryModel.findOne({ wellness_category_name: well_product.wellness_category_name })
                check_unique_data=await wellnessProductModel.findOne({wellness_product_name:well_product_find.wellness_product_name,wellness_category_id:wellness_cat_id._id,company:well_product.company});
                if(check_unique_data)
                {
                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }
                    console.log("ch1");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }

            
            if(!well_product.wellness_category_name  && !well_product.product_name )
            {
                console.log("h1");
                check_unique_data=await wellnessProductModel.findOne({wellness_product_name:well_product_find.wellness_product_name,wellness_category_id:well_product_find.wellness_category_id,company:well_product.company});
                // console.log(well_product_find);
                console.log(well_product.company);
                if(check_unique_data)
                {
                    // console.log(check_unique_data);
                    if (req.file) {
                        // image remove from the folder because error is generated
                        const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', image_name);
                        // console.log(i_path);
                        fs.unlink(i_path, (err) => {
                            if (err) {
                                return resp.status(400).send({ message: err });
                            }
                        });
                    }

                    console.log("ch4");
                    return resp.status(400).send({ message: "This company have already available this category product Name" });
                }
            }
            update.$set.company = well_product.company;
        }

        if (well_product.wellness_category_name) {
            const well_cat_id = await wellnessCategoryModel.findOne({ wellness_category_name: well_product.wellness_category_name })
            if (well_cat_id == null) {
                if (req.file) {
                    // image remove from the folder because error is generated
                    const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', image_name);
                    // console.log(i_path);
                    fs.unlink(i_path, (err) => {
                        if (err) {
                            return resp.status(400).send({ message: err });
                        }
                    });
                }
                return resp.status(400).send({ message: "Invalid category name" });

            }

            if(!well_product.company && !well_product.product_name)
                {
                    
                    check_unique_data=await wellnessProductModel.findOne({wellness_product_name:well_product_find.wellness_product_name,wellness_category_id:well_cat_id._id,company:well_product_find.company});
                    if(check_unique_data)
                    {
                        if (req.file) {
                            // image remove from the folder because error is generated
                            const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', image_name);
                            // console.log(i_path);
                            fs.unlink(i_path, (err) => {
                                if (err) {
                                    return resp.status(400).send({ message: err });
                                }
                            });
                        }
                        console.log("cth4");
                        return resp.status(400).send({ message: "This company have already available this category product Name" });
                    }
    
                }      
            update.$set.wellness_category_id = well_cat_id._id;

        }
        if (req.file) {
            const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', well_product_find.wellness_image);
            // console.log(i_path);
            fs.unlink(i_path, (err) => {
                if (err) {
                    return resp.status(400).send({ message: err });
                }
            });

            update.$set.wellness_image = image_name;
        }

        const result = await wellnessProductModel.updateOne(filter, update);
        // console.log(result.acknowledged);
        if (result.modifiedCount != 0 && result.acknowledged!=false) {
            return resp.status(500).send({ message: "Data updated successfully" });
        }
        resp.status(500).send({ message: "Data Not updated" });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

// also delete child record
exports.deleteWellnessProduct = async (req, resp) => {
    try {
        const well_product_id = req.params.id;
        const cart_find = await cartModel.findOne({ wellness_product_id: req.params.id });


        const well_product_name = await wellnessProductModel.findOne({ _id: well_product_id });
        // fs.unlinkSync(well_product_image);

        if (well_product_name == null) {
            return resp.status(400).send({ message: "Wellness Product not found" });
        }
        if (cart_find != null) {
            await cartModel.deleteMany({ wellness_product_id: req.params.id });
        }

        const well_product_image = well_product_name.wellness_image;
        const i_path = path.join(__dirname, '../', 'uploads', 'wellness_product', well_product_image);
        // console.log(i_path);
        fs.unlink(i_path, (err) => {
            if (err) {
                return resp.status(400).send({ message: err });
            }
        });
        const well_product = await wellnessProductModel.deleteOne({ _id: well_product_id });
        // if(well_product.deletedCount==0)
        // {
        //     return resp.status(400).send({message:"Wellness Product not found"});
        // }
        // console.log(well_product_name.wellness_product_name);
        resp.status(200).send({ message: `${well_product_name.wellness_product_name} was deleted` });

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchWellnessProduct = async (req, resp) => {
    try {

        // 1. method

        const well_product = await wellnessProductModel.find({ wellness_product_name: req.params.pname }).populate('wellness_category_id', 'wellness_category_name');

        const all_products = well_product.map(products => ({
            _id: products._id,
            product_name: products.wellness_product_name,
            image_name: products.wellness_image,
            amount: products.amount,
            company: products.company,
            wellness_category_name: products.wellness_category_id.wellness_category_name,
            i_path: path.join(__dirname, '../', 'uploads', 'wellness_product', products.wellness_image)
        }))
        if (all_products == "") {
            return resp.status(400).send({ message: "Wellness Product not found" });
        }

        resp.status(200).send(all_products);


        // 2. method

        // const well_product_name=req.params.pname;
        // const well_product= await wellnessProductModel.find({wellness_product_name:well_product_name});

        // if(well_product=="")
        // {
        //     // resp.status(400).send({message:"Users not found"});
        //     resp.status(400).send({message:"Wellness category not found"});
        //     return ;
        // }
        // console.log(well_product);
        // const search_product=await well_product.aggregate([
        //     {
        //         $lookup:{
        //             from:'wellness_categories',
        //             localField:'wellness_category_id',
        //             foreignField:'_id',
        //             as:'category'
        //         }
        //     },
        //     {
        //         $project:{
        //             _id:0,  // if 1 then show the id
        //             wellness_product_name:1,
        //             wellness_image:1,
        //             wellness_category_name:'$category.wellness_category_name'
        //         }
        //     }
        // ])

        // resp.status(200).send(search_product);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


