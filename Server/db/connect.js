const mongoose = require("mongoose");
require('dotenv').config()
MONGO = "mongodb+srv://newlooktextile:newtextile@cluster0.0fhax.mongodb.net/test_db?retryWrites=true&w=majority"
//"mongodb://hansaka:q1w2e3r4t5@ac-5twcvok-shard-00-00.rsv5ogb.mongodb.net:27017,ac-5twcvok-shard-00-01.rsv5ogb.mongodb.net:27017,ac-5twcvok-shard-00-02.rsv5ogb.mongodb.net:27017/firstdb?ssl=true&replicaSet=atlas-lx8r9j-shard-0&authSource=admin&retryWrites=true&w=majority"


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    
}).then(()=>{
    console.log("db Connected Successfully");
}).catch((err)=>{
    console.log(err);
})
