const express=require('express');
const routes=express.Router();

const {displayWellnessCategory,insertWellnessCategory,updateWellnessCategory,deleteWellnessCategory,searchWellnessCategory}=require('../controllers/wellnessCategoryControllers');

routes.get('/display',displayWellnessCategory);
routes.delete('/delete/:id',deleteWellnessCategory);
routes.post('/insert',insertWellnessCategory);
routes.put('/update/:id',updateWellnessCategory);
routes.get('/search/:cat_name',searchWellnessCategory);

module.exports =routes;


