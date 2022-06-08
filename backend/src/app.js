const express = require("express");
const cors = require("cors");
const router = require("./routes/index")
const homeRouter = require("./routes/home") //TODO: need to fix
const errorHandler = require("./middlewares/errorHandlingMiddleware")

//APP 
const app = express(); //TODO: прочитать что такое Експресс и его основные ништяки

//ADDITIONAL APP options
app.use(cors()) //TODO: что такое use() и как это работает в Nodejs - обработчик на какой то ендпоинт - для всех ендпоинтов: для любых методово
app.use(express.json())

//API endpoints
app.use("/api", router)
//app.use("/") - експресс со статическими данными / почитать доку
//Error middleware must be latest in the option list
app.use(errorHandler)

module.exports = app;