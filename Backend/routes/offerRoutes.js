const express=require('express');
const routes=express.Router();


// image insert
const multer=require('multer');
const temp=require('uuid');

const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"./uploads/offer");
    },
    filename:function(req,file,cb)
    {
        // cb(null,file.fieldname+"-"+Date.now()+".jpg")
        cb(null, temp.v4()+file.originalname);
    }
});
const upload=multer({storage});



const {displayoffer,insertoffer,updateoffer,deleteoffer,searchoffer}=require('../controllers/offerControllers');

routes.get('/display',displayoffer);
routes.delete('/delete/:id',deleteoffer);
routes.post('/insert',upload.single("user_file"),insertoffer);
routes.put('/update/:id',updateoffer);
routes.get('/search/:code',searchoffer);

module.exports =routes;


