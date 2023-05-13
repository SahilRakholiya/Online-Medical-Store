const express=require('express');
const routes=express.Router();

const {displayAllUserOrder,searchAllUserOrder,displayUserOrder,AddProduct,insertOrder,deleteOrder,searchOrder}=require('../controllers/orderControllers');


routes.get('/displayAllUserOrder',displayAllUserOrder);
routes.get('/searchAllUserOrder/:orderid',searchAllUserOrder);

// For Client side

routes.get('/display/:userid',displayUserOrder);
routes.put('/add/:orderid/:productid',AddProduct);
routes.post('/insert/:userid/:productid',insertOrder);
routes.delete('/delete/:userid/:orderid',deleteOrder);
routes.get('/search/:userid/:pname',searchOrder);

module.exports =routes;


