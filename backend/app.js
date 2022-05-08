const express = require("express");
const cors = require("cors");
const router = require("./routes/index")
const homeRouter = require("./routes/home") //TODO: need to fix
const errorHandler = require("./middlewares/errorHandlingMiddleware")

//APP 
const app = express(); //TODO: прочитать что такое Експресс и его основные ништяки

//ADDITIONAL APP options
app.use(cors()) //TODO: что такое use() и как это работает в Nodejs
app.use(express.json())

//API endpoints
app.use("/api", router)

//Error middleware must be latest in the option list
app.use(errorHandler)

module.exports = app;