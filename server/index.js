const express=require('express')
const app=express();
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config({path:'./server/.env'});
const testRoute=require('./routes/testRoutes');
const path = require('path');
app.use(express.json())
app.use(cors())
app.use('/api/v1/test',testRoute)
 const PORT=process.env.PORT
app.listen(PORT,(req,res)=>{
    console.log('server is running fine')
})