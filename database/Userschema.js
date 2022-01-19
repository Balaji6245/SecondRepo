const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp')

const User = mongoose.Schema({
    _userid : {
        type : String
    },
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
})
User.plugin(timestamp);
module.exports = new mongoose.model("Userdetails",User);