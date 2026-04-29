const express = require("express");
const app = express();
const fs = require("fs/promises");
const moment = require("moment");
const cors = require("cors");
const {contactsRouter} = require("./routes/api");
// const mongoose = require("mongoose");

// const DB_HOST = "mongodb+srv://slav:slav@cluster0.qngn6ho.mongodb.net/address_book?appName=Cluster0";

// mongoose.connect(DB_HOST)
//   .then(data=>console.log("Data base was connect"))
//   .catch(err=>console.log(err.message ));


 
app.use(cors());
app.use(express.json());

app.use(async(req, res, next)=>{
  const {url, method} = req;
  const data = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("./public/system.log", `\n${method} ${url} ${data}`)
  next();
})

app.use("/api/contacts",contactsRouter);

app.get("/", (req, res)=>{
  res.send("<h1>Главная страница</h1>");
})




app.use((req, res)=>{
  res.status(404).json({message: "нэт такого страныц! :-) "});
})

app.use((error, req, res, next)=>{
  console.log("error --->", error.status, error);
  const {status= 500, message = "server error"} = error;
    res.status(status).json(message);
})

module.exports = app;