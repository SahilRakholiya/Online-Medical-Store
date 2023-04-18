const express=require('express');
const routes=express.Router();

const {displayBeautyCategory,insertBeautyCategory,updateBeautyCategory,deleteBeautyCategory,searchBeautyCategory}=require('../controllers/beautyCategoryControllers');

routes.get('/display',displayBeautyCategory);
routes.delete('/delete/:id',deleteBeautyCategory);
routes.post('/insert',insertBeautyCategory);
routes.put('/update/:id',updateBeautyCategory);
routes.get('/search/:cat_name',searchBeautyCategory);

module.exports =routes;


