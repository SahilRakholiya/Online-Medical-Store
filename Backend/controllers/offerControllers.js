const offerModel = require('../models/offer');
const medicineModel = require('../models/medicine');
const wellnessProductModel = require('../models/wellness_product');
const beautyProductModel = require('../models/beauty_product');

const fs = require('fs');
const path = require('path');

exports.displayoffer = async (req, resp) => {
    try {

        const offer = await offerModel.find()
            .populate('medicine_id', 'medicine_name')
            .populate('wellness_product_id', 'wellness_product_name')
            .populate('beauty_product_id', 'beauty_product_name')
            .select('_id medicine_id wellness_product_id beauty_product_id offer_code percentage description offer_image');

        if (offer == "") {
            return resp.status(400).send({ message: "No offer Available" });
        }
        const all_offer = offer.map(offer => {
            if (offer.medicine_id) {
                return {
                    _id: offer._id,
                    medicine_name: offer.medicine_id.medicine_name,
                    offer_code: offer.offer_code,
                    percentage: offer.percentage,
                    description: offer.description,
                    offer_image: offer.offer_image,
                    i_path: path.join(__dirname, '../', 'uploads', 'offer', offer.offer_image)
                }
            }
            else {
                if (offer.wellness_product_id)
                    return {
                        _id: offer._id,
                        wellness_product_name: offer.wellness_product_id.wellness_product_name,
                        offer_code: offer.offer_code,
                        percentage: offer.percentage,
                        description: offer.description,
                        offer_image: offer.offer_image,
                        i_path: path.join(__dirname, '../', 'uploads', 'offer', offer.offer_image)

                    }
                else {
                    if (offer.beauty_product_id)
                        return {
                            _id: offer._id,
                            beauty_product_name: offer.beauty_product_id.beauty_product_name,
                            offer_code: offer.offer_code,
                            percentage: offer.percentage,
                            description: offer.description,
                            offer_image: offer.offer_image,
                            i_path: path.join(__dirname, '../', 'uploads', 'offer', offer.offer_image)
                        }
                }
            }
        })

        // _id:offer._id,
        // medicine_name:offer.medicine_id.medicine_name,
        // wellness_product_name:offer.wellness_product_id.wellness_product_name,
        // offer_code:offer.offer_code,
        // percentage:offer.percentage, 
        // description:offer.description

        resp.status(200).send(all_offer);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

exports.insertoffer = async (req, resp) => {
    try {
        const offer = req.body;
        let image_name = "";
        if (req.file) {
            image_name = req.file.filename;
        } else {
            return resp.status(400).send({ message: "Please upload the images " });
        }

        const newoffer = new offerModel({
            offer_code: offer.offer_code,
            percentage: offer.percentage,
            description: offer.description,
            offer_image: image_name
        })

        if ((offer.medicine_name && offer.wellness_product_name) || (offer.wellness_product_name && offer.beauty_product_name) || (offer.beauty_product_name && offer.medicine_name)) {
            // image remove from the folder because error is generated
            const i_path = path.join(__dirname, '../', 'uploads', 'offer', image_name)
            // console.log(i_path);
            fs.unlink(i_path, (err) => {
                if (err) {
                    return resp.status(400).send({ message: err });
                }
            });

            return resp.status(400).send({ message: "Please enter only medicine name or wellness product name or beauty product name" });
        }

        if (offer.medicine_name) {
            const medicine = await medicineModel.findOne({ medicine_name: offer.medicine_name });
            if (medicine == null) {
                // image remove from the folder because error is generated
                const i_path = path.join(__dirname, '../', 'uploads', 'offer', image_name)
                fs.unlink(i_path, (err) => {
                    if (err) {
                        return resp.status(400).send({ message: err });
                    }
                });

                return resp.status(400).send({ message: "Medicine Not found " });
            }
            // console.log(medicine._id);
            newoffer.medicine_id = medicine._id;
            // temp=true;
        }

        if (offer.wellness_product_name) {
            const wellness_product = await wellnessProductModel.findOne({ wellness_product_name: offer.wellness_product_name });
            if (wellness_product == null) {
                // image remove from the folder because error is generated
                const i_path = path.join(__dirname, '../', 'uploads', 'offer', image_name)
                fs.unlink(i_path, (err) => {
                    if (err) {
                        return resp.status(400).send({ message: err });
                    }
                });
                return resp.status(400).send({ message: "Wellness Product Not found " });
            }

            // console.log(medicine._id);
            newoffer.wellness_product_id = wellness_product._id;
        }

        if (offer.beauty_product_name) {
            const beauty_product = await beautyProductModel.findOne({ beauty_product_name: offer.beauty_product_name });
            if (beauty_product == null) {

                // image remove from the folder because error is generated
                const i_path = path.join(__dirname, '../', 'uploads', 'offer', image_name)
                fs.unlink(i_path, (err) => {
                    if (err) {
                        return resp.status(400).send({ message: err });
                    }
                });
                return resp.status(400).send({ message: "Beauty Product Not found " });
            }

            // console.log(medicine._id);
            newoffer.beauty_product_id = beauty_product._id;
        }

        result = await newoffer.save();
        resp.status(200).send(result);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

// updated name

exports.updateoffer = async (req, resp) => {
    try {
        const offer_id = req.params.id;
        const offer_data = req.body;
        let image_name = "";
        if (req.file) {
            image_name = req.file.filename;
        }

        const offer_search = await offerModel.findOne({ _id: offer_id });

        if (!offer_search) {
            if (req.file) {
                // image remove from the folder because error is generated
                const i_path = path.join(__dirname, '../', 'uploads', 'offer', image_name)
                fs.unlink(i_path, (err) => {
                    if (err) {
                        return resp.status(400).send({ message: err });
                    }
                });

            }
            return resp.status(400).send({ message: "offer not found" });
        }

        // 1.
        const filter = { _id: offer_id };
        const update = { $set: {} };

        if (offer_data.medicine_name) {
            const medicine = await medicineModel.findOne({ medicine_name: offer_data.medicine_name })
            if (!medicine) {

                if (req.file) {
                    // image remove from the folder because error is generated
                    const i_path = path.join(__dirname, '../', 'uploads', 'offer', image_name)
                    fs.unlink(i_path, (err) => {
                        if (err) {
                            return resp.status(400).send({ message: err });
                        }
                    });

                }

                return resp.status(400).send({ message: "medicine not found" });
            }

            update.$unset = { 'wellness_product_id': '', 'beauty_product_id': '' };
            // update.$unset={'beauty_product_id':''};
            update.$set.medicine_id = medicine._id;
        }

        if (offer_data.wellness_product_name) {
            const wellness_product = await wellnessProductModel.findOne({ wellness_product_name: offer_data.wellness_product_name })

            if (!wellness_product) {
                if (req.file) {
                    // image remove from the folder because error is generated
                    const i_path = path.join(__dirname, '../', 'uploads', 'offer', image_name)
                    fs.unlink(i_path, (err) => {
                        if (err) {
                            return resp.status(400).send({ message: err });
                        }
                    });
                }

                return resp.status(400).send({ message: "wellness_product not found" });
            }

            update.$unset = { 'medicine_id': '', 'beauty_product_id': '' };
            // update.$unset={'beauty_product_id':''};
            update.$set.wellness_product_id = wellness_product._id;
        }

        if (offer_data.beauty_product_name) {
            const beauty_product = await beautyProductModel.findOne({ beauty_product_name: offer_data.beauty_product_name })

            if (!beauty_product) {
                if (req.file) {
                    // image remove from the folder because error is generated
                    const i_path = path.join(__dirname, '../', 'uploads', 'offer', image_name)
                    fs.unlink(i_path, (err) => {
                        if (err) {
                            return resp.status(400).send({ message: err });
                        }
                    });
                }
                return resp.status(400).send({ message: "beauty_product not found" });
            }

            update.$unset = { 'medicine_id': '', 'wellness_product_id': '' };
            // update.$unset={'wellness_product_id':''};
            update.$set.beauty_product_id = beauty_product._id;
        }

        if (offer_data.offer_code) {
            update.$set.offer_code = offer_data.offer_code;
        }
        if (offer_data.percentage) {
            update.$set.percentage = offer_data.percentage;
        }

        if (offer_data.description) {
            update.$set.description = offer_data.description;
        }
        if(req.file)
        {
            const i_path = path.join(__dirname, '../', 'uploads', 'offer', offer_search.offer_image)
            fs.unlink(i_path, (err) => {
                if (err) {
                    return resp.status(400).send({ message: err });
                }
            });
            update.$set.offer_image = image_name;

        }

        const result = await offerModel.updateOne(filter, update);
        if (result.modifiedCount == 1) {
            return resp.status(500).send({ message: "Data updated successfully" });
        }
        resp.status(500).send({ message: "Data Not updated" });

        // resp.status(200).send({ message: "Data Updated successfully" });



        // 2. for example

        // const temp = false;

        // if (offer_data.medicine_name) {

        //     const medicine = medicineModel.findone({ medicine_name: offer_data.medicine_name })

        //     offerModel.updateOne({ _id: offer_id }, {
        //         $set: {
        //             medicine_id: medicine._id
        //         }
        //     }, (err, offer_update) => {
        //         if (err) {
        //             console.error(err);
        //             return resp.status(500).send(err);
        //         }
        //         if (!offer_update) {
        //             return resp.status(400).send({ message: "Data not updated" });
        //         }
        //         temp = true;
        //         // resp.status(200).send({ message: "Data Updated successfully" });
        //     })
        // }

        // else {
        //     if (offer_data.wellness_product_name) {

        //         const wellness_product = wellnessProductModel.findone({ wellness_product_name: offer_data.wellness_product_name })

        //         offerModel.updateOne({ _id: offer_id }, {
        //             $set: {
        //                 wellness_product_id: wellness_product._id
        //             }
        //         }, (err, offer_update) => {
        //             if (err) {
        //                 console.error(err);
        //                 return resp.status(500).send(err);
        //             }
        //             if (!offer_update) {
        //                 return resp.status(400).send({ message: "Data not updated" });
        //             }
        //             temp = true;
        //             // resp.status(200).send({ message: "Data Updated successfully" });
        //         })
        //     }
        //     else {
        //         if (offer_data.beauty_product_name) {

        //             const beauty_product = beautyProductModel.findone({ beauty_product_name: offer_data.beauty_product_name })

        //             offerModel.updateOne({ _id: offer_id }, {
        //                 $set: {
        //                     beauty_product_id: beauty_product._id
        //                 }
        //             }, (err, offer_update) => {
        //                 if (err) {
        //                     console.error(err);
        //                     return resp.status(500).send(err);
        //                 }
        //                 if (!offer_update) {
        //                     return resp.status(400).send({ message: "Data not updated" });
        //                 }
        //                 temp = true;
        //                 // resp.status(200).send({ message: "Data Updated successfully" });
        //             })
        //         }

        //     }
        // }



        // if (offer_data.offer_code && offer_data.percentage && offer_data.description) {
        //     offerModel.updateOne({ _id: offer_id }, {
        //         $set: {
        //             offer_code: offer_data.offer_code,
        //             percentage: offer_data.percentage,
        //             description: offer_data.description
        //         }
        //     }, (err, offer_update) => {
        //         if (err) {
        //             console.error(err);
        //             return resp.status(500).send(err);
        //         }
        //         if (!offer_update) {
        //             return resp.status(400).send({ message: "Data not updated" });
        //         }
        //         resp.status(200).send({ message: "Data Updated successfully" });
        //     })
        // }



    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}


exports.deleteoffer = async (req, resp) => {
    try {
        const offer_find = await offerModel.findOne({ _id: req.params.id });

        if (offer_find == null) {
            return resp.status(400).send({ message: "offer not found" });
        }
                

        const code = offer_find.offer_code;

        const offer_image_name=offer_find.offer_image;
        const i_path = path.join(__dirname, '../', 'uploads', 'offer',offer_image_name)
        fs.unlink(i_path, (err) => {
            if (err) {
                return resp.status(400).send({ message: err });
            }
        });

        const offer = await offerModel.deleteOne({ _id: req.params.id });

        resp.status(200).send({ message: `${code} was deleted` });    // .

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchoffer = async (req, resp) => {
    try {
        const code = req.params.code;
        const offer = await offerModel.find({ offer_code: code })
            .populate('medicine_id', 'medicine_name')
            .populate('wellness_product_id', 'wellness_product_name')
            .populate('beauty_product_id', 'beauty_product_name')
            .select('_id medicine_id wellness_product_id beauty_product_id offer_code percentage description offer_image');

        if (offer == "") {
            resp.status(400).send({ message: "Offer not found" });
            return;
        }
        const offer_search = offer.map(offer => {
            if (offer.medicine_id) {
                return {
                    _id: offer._id,
                    medicine_name: offer.medicine_id.medicine_name,
                    offer_code: offer.offer_code,
                    percentage: offer.percentage,
                    description: offer.description,
                    offer_image: offer.offer_image,
                    i_path: path.join(__dirname, '../', 'uploads', 'offer', offer.offer_image)                    
                }
            }
            else {
                if (offer.wellness_product_id)
                    return {
                        _id: offer._id,
                        wellness_product_name: offer.wellness_product_id.wellness_product_name,
                        offer_code: offer.offer_code,
                        percentage: offer.percentage,
                        description: offer.description,
                        offer_image: offer.offer_image,
                        i_path: path.join(__dirname, '../', 'uploads', 'offer', offer.offer_image)
                    }
                else {
                    if (offer.beauty_product_id)
                        return {
                            _id: offer._id,
                            beauty_product_name: offer.beauty_product_id.beauty_product_name,
                            offer_code: offer.offer_code,
                            percentage: offer.percentage,
                            description: offer.description,
                            offer_image: offer.offer_image,
                            i_path: path.join(__dirname, '../', 'uploads', 'offer', offer.offer_image)
                        }
                }
            }
        })


        resp.status(200).send(offer_search);

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}

