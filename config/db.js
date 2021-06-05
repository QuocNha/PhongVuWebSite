const mongoose =require('mongoose');
const config= require('config');
const db = config.get('mongoURI');


const  connectDB =  async()=>{
    try{
      console.log("Vao roi")
        await mongoose.connect(db);
      console.log("MongoDb connect");
    }catch(error){
        console.error(error.message);
        // exit connect when error
        process.exit(1);
    }
}
exports.connectDB = () => mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
