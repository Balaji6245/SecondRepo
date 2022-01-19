const jwt = require('jsonwebtoken')
const shortid = require('shortid');
const Crypto = require('crypto')

function Utills(){

    this.generateshortid = function(){
        return shortid.generate();
    }

    this.createhashpassword = function(input){
        return Crypto.createHash('md5').update(input).digest("hex");
    }
}

module.exports = new Utills();