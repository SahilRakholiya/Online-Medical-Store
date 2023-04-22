const express=require('express');
const routes=express.Router();

const {displayAllUsercart,searchAllUsercart,displaycart,insertcart,deletecart,searchcart}=require('../controllers/cartControllers');

// for Admin side

routes.get('/displayAllUsercart',displayAllUsercart);
routes.get('/searchAllUsercart/:pname',searchAllUsercart);
// routes.delete('/delete/:id',deletecart);


// For Client side

routes.get('/display/:userid',displaycart);
routes.post('/insert/:userid',insertcart);
// routes.put('/update/:id',updatecart);
routes.delete('/delete/:userid/:cartid',deletecart);
routes.get('/search/:userid/:pname',searchcart);

module.exports =routes;


