
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    avatar:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})
module.exports = mongoose.model('users',userSchema);