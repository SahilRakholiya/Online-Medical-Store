const express=require('express');
// const Time=require('Time');
const routes=express.Router();

// image insert
const multer=require('multer');
const temp=require('uuid');

const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"./uploads/wellness_product");
    },
    filename:function(req,file,cb)
    {
        // cb(null,file.fieldname+"-"+Date.now()+".jpg")
        cb(null, temp.v4()+file.originalname);
    }
});
const upload=multer({storage});

const {displayWellnessProduct,insertWellnessProduct,updateWellnessProduct,deleteWellnessProduct,searchWellnessProduct}=require('../controllers/wellnessProductControllers');

routes.get('/display',displayWellnessProduct);
routes.get('/delete/:id',deleteWellnessProduct);
routes.post('/insert',upload.single("user_file"),insertWellnessProduct);
routes.put('/update/:id',updateWellnessProduct);
routes.get('/search/:pname',searchWellnessProduct);

module.exports =routes;


