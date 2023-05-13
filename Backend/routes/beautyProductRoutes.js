const express=require('express');

const routes=express.Router();

// image insert
const multer=require('multer');
const temp=require('uuid');

const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"./uploads/beauty_product");
    },
    filename:function(req,file,cb)
    {
        // cb(null,file.fieldname+"-"+Date.now()+".jpg")
        cb(null, temp.v4()+file.originalname);
    }
});
const upload=multer({storage});

const {displayBeautyProduct,insertBeautyProduct,updateBeautyProduct,deleteBeautyProduct,searchBeautyProduct}=require('../controllers/beautyProductControllers');

routes.get('/display',displayBeautyProduct);
routes.delete('/delete/:id',deleteBeautyProduct);
routes.post('/insert',upload.single("user_file"),insertBeautyProduct);
routes.put('/update/:id',upload.single("user_file"),updateBeautyProduct);
routes.get('/search/:pname',searchBeautyProduct);

module.exports =routes;


