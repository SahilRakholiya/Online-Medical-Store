const express=require('express');
const routes=express.Router();

const {displayfeedback,insertfeedback,updatefeedback,deletefeedback,searchfeedback}=require('../controllers/feedbackControllers');

routes.get('/display',displayfeedback);
routes.delete('/delete/:id',deletefeedback);
routes.post('/insert',insertfeedback);
// routes.put('/update/:email',updatefeedback);
routes.get('/search/:topic',searchfeedback);

module.exports =routes;


