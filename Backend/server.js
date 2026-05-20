const app = require('./src/app')
require("dotenv").config();
const ConnectDB = require("./src/config/db")

ConnectDB()
const port = 3000;
app.listen(port, () => {
  console.log("server running")
})