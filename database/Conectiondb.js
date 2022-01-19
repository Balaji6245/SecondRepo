const mongoose = require('mongoose');
require('dotenv').config();

function mongoconnection(){

    this . createconnection = function(){
        const uri = process.env.MONGO;

        mongoose.connect(uri,
            {useNewUrlParser:true,useUnifiedTopology:true},()=>{
                console.log("DB Conneced...")
        });
    }
    
}

module.exports = new mongoconnection();
