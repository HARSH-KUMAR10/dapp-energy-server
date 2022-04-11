const mongoose = require("mongoose");
var db = 'mongodb://jsx0:jsx0@cluster1-shard-00-00.w9byh.mongodb.net:27017,cluster1-shard-00-01.w9byh.mongodb.net:27017,cluster1-shard-00-02.w9byh.mongodb.net:27017/dapp-energy?ssl=true&replicaSet=atlas-e0dj3o-shard-0&authSource=admin&retryWrites=true&w=majority';
var Schema = mongoose.Schema;

mongoose.connect(db).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log("Error : "+err);
});


let users = new mongoose.Schema({
    Email: {type:String,unique:true,dropDups:true,required:true},
    Password:{type:String,required:true},
    Wallet:{type:Number,required:true}
});

let sell = new mongoose.Schema({
    Id:{type:String,required:true},
    Units:{type:Number, required:true},
    Price:{type:Number,required:true},
    Email:{type:String,required:true},
    Active:{type:Boolean,required:true},
    AdminActive:{type:Boolean,required:true},
    Sold:{type:Boolean,required:true},
})

let transaction = new mongoose.Schema({
    From:{type:String,required:true},
    To:{type:String, required:true},
    Units:{type:Number,required:true},
    Total:{type:Number,required:true}
})

const user = mongoose.model('users',users);
const sells = mongoose.model('sell',sell);
const transactions = mongoose.model('transaction',transaction);


module.exports = {user,sells,transactions};