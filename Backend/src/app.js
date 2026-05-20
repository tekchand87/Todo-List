const express = require("express")
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
const mainRouter = require("./routes/do.routes")

app.use('/tasks',mainRouter)

module.exports = app