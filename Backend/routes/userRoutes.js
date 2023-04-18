const express=require('express');
const routes=express.Router();

const {displayuser,insertuser,updateuser,deleteuser,searchuser}=require('../controllers/userControllers');

routes.get('/display',displayuser);
routes.delete('/delete/:id',deleteuser);
routes.post('/insert',insertuser);
routes.put('/update/:email',updateuser);
routes.get('/search/:uname',searchuser);

module.exports =routes;


