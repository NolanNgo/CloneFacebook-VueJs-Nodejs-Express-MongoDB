
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const Port = 8081 || process.env.PORT;
const userRouter = require('./router/User');
const postRouter = require('./router/Post');
require('dotenv').config();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

const connectDb = async()=>{
    try{
        await mongoose.connect("mongodb+srv://hieumh:12345@projectvue.lye6j.mongodb.net/ProjectVue?retryWrites=true&w=majority",{
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('moongose DB is connecting');
    }catch(error){
        console.log(error.message);
    }
}
connectDb();
app.use('/api/user',userRouter);
app.use('/api/post',postRouter);
// app.get('/',(req,res)=>{
//     res.send('Hello my Serve');
// })
app.listen(Port,()=>{
    console.log(`Server is running at ${Port}`);
})
