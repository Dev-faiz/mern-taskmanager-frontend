 

 // method 1 

 const mongoose = require('mongoose' );
 const connectDB = async (req, res, next) =>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
 }
 module.exports = connectDB 

 // method 1 for connect to mongoDb place this method in to server.js file 
//  const startServer = async () =>{
    //     try {
    //         await connectDb();
    //         app.listen(PORT, () => {
    //             console.log(`Server is running on port ${PORT}`);
    //         });
    
    //     }catch(e) {
    //         console.log(e);
    //     }
    //     startServer();
    
    // }
