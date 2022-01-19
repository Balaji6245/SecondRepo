const mongoose = require('mongoose');
const Follow = mongoose.Schema({
    _followingid : {
        type : String
    },
    _followerid : {
        type : String
    }
})

module.exports = new mongoose.model("follows",Follow)