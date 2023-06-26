const express=require('express');
const mongoose=require('mongoose')
const bodyparser=require('body-parser');
const route=require('./Route/route.js')
const app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
mongoose.connect('mongodb+srv://saaariik-sarul:Rahul1991*@cluster0.adxgdju.mongodb.net/college',{
    useNewUrlParser:true
}).then(()=>{
    console.log("Mongo db connected")
})
.catch((err)=>{
    console.log(err)
})

app.use('/',route)


app.listen(3000,()=>{
    console.log("server run at 3000")
})