// creating server for file
const dotEnv = require('dotenv').config();
const express = require('express');
const connectDb = require('./config/connectDB');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000; 
// const Task = require('./models/taskModel');
const taskRoutes = require('./routes/taskRoutes');

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT , ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((e)=>{console.log(e);});

connectDb();
//middleware is function that can be inserted in to our routes
// it has access to req res and next during thier cycles

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use("/api/tasks" ,taskRoutes);

// const logger = (req , res , next ) =>{
//     console.log("middlesWare ran");
//     console.log(req.body)
//     next();
// }
// routes 
app.get('/', (req, res) => {
    res.send('HomePage');
});



// connecting app to mongoDB

//mongodb+srv://faizkfz:<password>@cluster0.hnjm2wj.mongodb.net/?retryWrites=true&w=majority
// 