const express=require('express');
const routes=express.Router();
const {loginuser,displayuser,insertuser,updateuser,deleteuser,searchuser,updateaddress}=require('../controllers/userControllers');


routes.post('/login',loginuser);
routes.get('/display',displayuser);
routes.delete('/delete/:id',deleteuser);
routes.post('/insert',insertuser);
routes.put('/update/:email',updateuser);
routes.get('/search/:id',searchuser);
routes.put('/updateaddress/:id',updateaddress)


module.exports =routes;


