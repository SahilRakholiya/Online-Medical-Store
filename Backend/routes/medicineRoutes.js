const express=require('express');
const routes=express.Router();


// image insert
const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"./uploads")
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname)
    }
});

const upload=multer({storage});


const {displaymedicine,insertmedicine,updatemedicine,deletemedicine,searchmedicine}=require('../controllers/medicineControllers');

routes.get('/display',displaymedicine);
routes.delete('/delete/:id',deletemedicine);
routes.post('/insert',upload.single("user_file"),insertmedicine);
routes.put('/update/:id',updatemedicine);
routes.get('/search/:mname',searchmedicine);

module.exports =routes;


