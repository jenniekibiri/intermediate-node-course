const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const dotenv = require('dotenv').config()
const port=8000;
const app= express();
const User = require('./models/User')
//create database connection

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log('database connected'))
  .catch((err)=>console.log(`error${err}`))

  function sendResponse(res,err,data){
  if (err){
    res.json({
      success: false,
      message: err
    })
  } else if (!data){
    res.json({
      success: false,
      message: "Not Found"
    })
  } else {
    res.json({
      success: true,
      data: data
    })
  }
}
  app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users',(req,res)=>{
  User.create(
    {
      ...req.body
    },
    (err,data)=>{
  sendResponse(res,err,data)
  })
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id,(err,data)=>{
  
    sendResponse(res,err,data)
  })
})
// UPDATE
.put((req,res)=>{
   const {name,email,password} = req.body
  User.findByIdAndUpdate(

    req.params.id,
   
    {
     name,
      email,
      password
    },
    {//returns a modified document
      new:true
    },
    (err,data)=>{
    sendResponse(res,err,data)
    
    }
  )
})
// DELETE
// DELETE
.delete((req,res)=>{
  User.findByIdAndDelete(
    req.params.id,
    (err,data)=>{
      sendResponse(res,err,data)
    }
  )
})