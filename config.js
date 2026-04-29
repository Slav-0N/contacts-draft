const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://slav:slav@cluster0.qngn6ho.mongodb.net/contacts?appName=Cluster0";

mongoose.connect(DB_HOST)
    .then((data)=>{
        console.log("db conntcted");
        app.listen(3000, ()=>{console.log("server is running at 3000 port...")});
    })
    .catch(err=>{
        console.log(err);
        process.exit(1);
    })



// app.listen(3333, ()=>{
//   console.log("Server is running on 3333 port.")
// })