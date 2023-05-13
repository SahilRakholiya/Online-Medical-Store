require('./config/connection');
const express=require('express');
const app=express();
const cors = require('cors')

app.use(cors())
app.use(express.json());


const user_route=require('./routes/userRoutes');
const medicine_route=require('./routes/medicineRoutes');
const wellness_category_route=require('./routes/wellnessCategoryRoutes');
const wellness_product_route=require('./routes/wellnessProductRoutes');
const beauty_category_route=require('./routes/beautyCategoryRoutes');
const beauty_product_route=require('./routes/beautyProductRoutes');
const offer_route=require('./routes/offerRoutes');
const cart_route=require('./routes/cartRoutes');
const order_route=require('./routes/orderRoutes');
const feedback_route=require('./routes/feedbackRoutes');


app.use('/user',user_route);
app.use('/medicine',medicine_route);
app.use('/wellnesscategory',wellness_category_route);
app.use('/wellnessproduct',wellness_product_route);
app.use('/beautycategory',beauty_category_route);
app.use('/beautyproduct',beauty_product_route);
app.use('/offer',offer_route);
app.use('/cart',cart_route);
app.use('/order',order_route);
// app.use('/finalorder',final_order_route);
app.use('/feedback',feedback_route);


app.listen(5000);

