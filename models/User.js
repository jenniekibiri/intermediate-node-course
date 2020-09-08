const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    //create the data fields  as objects
    name:{type:String,required:true},
    email:{type: String,required:true},
    password:{type: String,required:true}
});
//export the model
module.exports=mongoose.model('User',UserSchema)