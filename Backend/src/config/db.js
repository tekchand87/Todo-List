const mongoose = require("mongoose")
function ConnectDB(){
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Server is connected to DB");
  })
  .catch(err=>{
    console.log("Error is connecting to DB")
     process.exit(1)
  })
}
module.exports= ConnectDB